-- Ported from https://github.com/juliangruber/balanced-match using GPT-5.4
-- Needed for https://github.com/juliangruber/brace-expansion

local M = {}

function M.range(a, b, str)
    if type(a) ~= "string" or type(b) ~= "string" or type(str) ~= "string" then
    return nil
  end

  local ai = str:find(a, 1, true)
  local bi = ai and str:find(b, ai + 1, true) or nil
  local i = ai

  if not ai or not bi then
    return nil
  end

  if a == b then
    return { ai, bi }
  end

  local begs = {}
  local left = #str + 1
  local right = nil
  local result = nil

  while i and not result do
    if i == ai then
      table.insert(begs, i)
      ai = str:find(a, i + 1, true)
    elseif #begs == 1 then
      result = { table.remove(begs), bi }
    else
      local beg = table.remove(begs)
      if beg and beg < left then
        left = beg
        right = bi
      end

      bi = str:find(b, i + 1, true)
    end

    if ai and ai < bi then
      i = ai
    else
      i = bi
    end
  end

  if #begs > 0 and right then
    result = { left, right }
  end

  return result
end

function M.balanced(a, b, str)
  local r = M.range(a, b, str)
  if not r then
    return nil
  end

  local start_pos, end_pos = r[1], r[2]

  return {
    start = start_pos,
    ["end"] = end_pos,
    pre = str:sub(1, start_pos - 1),
    body = str:sub(start_pos + #a, end_pos - 1),
    post = str:sub(end_pos + #b),
  }
end

return M
