-- Ported from https://github.com/juliangruber/balanced-match using GPT-5.4
-- Needed for https://github.com/juliangruber/brace-expansion
local M = {}

local function maybe_match(pattern, str)
  local s, e = string.find(str, pattern)
  if s then
    return string.sub(str, s, e)
  end
  return nil
end

local function resolve(x, str)
  -- Plain string: use it directly
  if type(x) == "string" then
    return x
  end

  -- Pattern wrapper: { pattern = "..." }
  if type(x) == "table" and type(x.pattern) == "string" then
    return maybe_match(x.pattern, str)
  end

  return nil
end

local function next_index(ai, bi)
  if ai and bi then
    return (ai < bi) and ai or bi
  end
  return ai or bi
end

function M.range(a, b, str)
  local begs
  local beg
  local left
  local right = nil
  local result = nil

  local ai = string.find(str, a, 1, true)
  if not ai then
    return nil
  end

  local bi = string.find(str, b, ai + 1, true)
  local i = ai

  if ai and bi then
    if a == b then
      -- Keep the same zero-based semantics as the original TypeScript
      return { ai - 1, bi - 1 }
    end

    begs = {}
    left = #str + 1

    while i and not result do
      if i == ai then
        table.insert(begs, i)
        ai = string.find(str, a, i + 1, true)
      elseif #begs == 1 then
        local r = table.remove(begs)
        if r then
          result = { r - 1, bi - 1 }
        end
      else
        beg = table.remove(begs)
        if beg and beg < left then
          left = beg
          right = bi
        end

        bi = string.find(str, b, i + 1, true)
      end

      i = next_index(ai, bi)
    end

    if #begs > 0 and right then
      result = { left - 1, right - 1 }
    end
  end

  return result
end

function M.balanced(a, b, str)
  local ma = resolve(a, str)
  local mb = resolve(b, str)

  local r = (ma ~= nil and mb ~= nil) and M.range(ma, mb, str) or nil

  if not r then
    return nil
  end

  return {
    start = r[1],
    ["end"] = r[2],
    pre = string.sub(str, 1, r[1]),
    body = string.sub(str, r[1] + #ma + 1, r[2]),
    post = string.sub(str, r[2] + #mb + 1),
  }
end

return M