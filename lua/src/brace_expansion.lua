-- Ported from https://github.com/juliangruber/brace-expansion using GPT-5.4
local M = {}

local balanced_match = require("balanced_match")
local balanced = balanced_match.balanced or balanced_match

local token_seed = tostring(os.time()) .. tostring(math.random())

local esc_slash = "\0SLASH" .. token_seed .. "\0"
local esc_open = "\0OPEN" .. token_seed .. "\0"
local esc_close = "\0CLOSE" .. token_seed .. "\0"
local esc_comma = "\0COMMA" .. token_seed .. "\0"
local esc_period = "\0PERIOD" .. token_seed .. "\0"

M.EXPANSION_MAX = 100000

local function append_all(dst, src)
  for i = 1, #src do
    dst[#dst + 1] = src[i]
  end
end

local function split_plain(str, sep)
  local out = {}
  local start = 1

  while true do
    local i, j = string.find(str, sep, start, true)
    if not i then
      out[#out + 1] = string.sub(str, start)
      break
    end

    out[#out + 1] = string.sub(str, start, i - 1)
    start = j + 1
  end

  return out
end

local function numeric(str)
  local n = tonumber(str)
  if n ~= nil then
    return n
  end
  return string.byte(str, 1)
end

local function escape_braces(str)
  return str
    :gsub("\\\\", esc_slash)
    :gsub("\\{", esc_open)
    :gsub("\\}", esc_close)
    :gsub("\\,", esc_comma)
    :gsub("\\%." , esc_period)
end

local function unescape_braces(str)
  return str
    :gsub(esc_slash, "\\")
    :gsub(esc_open, "{")
    :gsub(esc_close, "}")
    :gsub(esc_comma, ",")
    :gsub(esc_period, ".")
end

local function parse_comma_parts(str)
  if str == "" then
    return { "" }
  end

  local m = balanced("{", "}", str)
  if not m then
    return split_plain(str, ",")
  end

  local pre = m.pre
  local body = m.body
  local post = m.post

  local p = split_plain(pre, ",")
  p[#p] = p[#p] .. "{" .. body .. "}"

  local post_parts = parse_comma_parts(post)
  if #post > 0 then
    p[#p] = p[#p] .. table.remove(post_parts, 1)
    append_all(p, post_parts)
  end

  return p
end

local function embrace(str)
  return "{" .. str .. "}"
end

local function is_padded(el)
  return el:match("^%-?0%d") ~= nil
end

local function lte(i, y)
  return i <= y
end

local function gte(i, y)
  return i >= y
end

local function is_numeric_sequence(body)
  return body:match("^%-?%d+%.%.%-?%d+$") ~= nil
    or body:match("^%-?%d+%.%.%-?%d+%.%.%-?%d+$") ~= nil
end

local function is_alpha_sequence(body)
  return body:match("^[A-Za-z]%.%.[A-Za-z]$") ~= nil
    or body:match("^[A-Za-z]%.%.[A-Za-z]%.%.%-?%d+$") ~= nil
end

local function has_invalid_comma_followed_by_close(post)
  for i = 1, #post do
    if post:sub(i, i) == "," then
      local next_char = post:sub(i + 1, i + 1)
      if next_char ~= "," and post:find("}", i + 1, true) then
        return true
      end
    end
  end
  return false
end

local expand_

expand_ = function(str, max, is_top)
  local expansions = {}

  local m = balanced("{", "}", str)
  if not m then
    return { str }
  end

  local pre = m.pre
  local post = (#m.post > 0) and expand_(m.post, max, false) or { "" }

  if pre:match("%$$") then
    for k = 1, #post do
      if k >= max + 1 then
        break
      end
      expansions[#expansions + 1] = pre .. "{" .. m.body .. "}" .. post[k]
    end
  else
    local numeric_sequence = is_numeric_sequence(m.body)
    local alpha_sequence = is_alpha_sequence(m.body)
    local is_sequence = numeric_sequence or alpha_sequence
    local is_options = m.body:find(",", 1, true) ~= nil

    if not is_sequence and not is_options then
      if has_invalid_comma_followed_by_close(m.post) then
        str = m.pre .. "{" .. m.body .. esc_close .. m.post
        return expand_(str, max, true)
      end
      return { str }
    end

    local n

    if is_sequence then
      n = split_plain(m.body, "..")
    else
      n = parse_comma_parts(m.body)

      if #n == 1 and n[1] ~= nil then
        local expanded = expand_(n[1], max, false)
        n = {}
        for i = 1, #expanded do
          n[#n + 1] = embrace(expanded[i])
        end

        if #n == 1 then
          local out = {}
          for i = 1, #post do
            out[#out + 1] = m.pre .. n[1] .. post[i]
          end
          return out
        end
      end
    end

    local N

    if is_sequence and n[1] ~= nil and n[2] ~= nil then
      local x = numeric(n[1])
      local y = numeric(n[2])
      local width = math.max(#n[1], #n[2])

      local incr = 1
      if #n == 3 and n[3] ~= nil then
        incr = math.abs(numeric(n[3]))
      end

      local test = lte
      local reverse = y < x
      if reverse then
        incr = -incr
        test = gte
      end

      local pad = false
      for i = 1, #n do
        if is_padded(n[i]) then
          pad = true
          break
        end
      end

      N = {}

      local i = x
      while test(i, y) do
        local c

        if alpha_sequence then
          c = string.char(i)
          if c == "\\" then
            c = ""
          end
        else
          c = tostring(i)

          if pad then
            local need = width - #c
            if need > 0 then
              local z = string.rep("0", need)
              if i < 0 then
                c = "-" .. z .. c:sub(2)
              else
                c = z .. c
              end
            end
          end
        end

        N[#N + 1] = c
        i = i + incr
      end
    else
      N = {}

      for j = 1, #n do
        local expanded = expand_(n[j], max, false)
        append_all(N, expanded)
      end
    end

    for j = 1, #N do
      for k = 1, #post do
        if #expansions >= max then
          break
        end

        local expansion = pre .. N[j] .. post[k]
        if (not is_top) or is_sequence or expansion ~= "" then
          expansions[#expansions + 1] = expansion
        end
      end

      if #expansions >= max then
        break
      end
    end
  end

  return expansions
end

function M.expand(str, options)
  if not str or str == "" then
    return {}
  end

  options = options or {}
  local max = options.max or M.EXPANSION_MAX

  if str:sub(1, 2) == "{}" then
    str = "\\{\\}" .. str:sub(3)
  end

  local out = expand_(escape_braces(str), max, true)
  for i = 1, #out do
    out[i] = unescape_braces(out[i])
  end
  return out
end

return M