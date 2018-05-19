export default {
  comment: /^'.*\n/m,
  operator: {
    pattern: /(\b|^)(abstract|actor|class|component|enum|interface|object|participant|state|usecase)\b/im,
  },
  bold: {
    pattern: /(\b|^)title\b.*\n/,
    alias: 'bold'
  },
  keyword: {
    pattern: /(\b|^)(@enduml|@startuml|activate|again|also|alt|as|autonumber|bottom|box|break|center|create|critical|deactivate|destroy|down|else|end|endif|endwhile|footbox|footer|fork|group|header|hide|if|is|left|link|loop|namespace|newpage|note|of|on|opt|over|package|page|par|partition|ref|repeat|return|right|rotate|show|skin|skinparam|start|stop|title|top|top to bottom direction|up|while)\b/im,
    alias: 'operator'
  },
  color: {
    pattern: /(\b|^)(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkGrey|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|Darkorange|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|Grey|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/m,
    alias: 'boolean'
  },
  arrow: {
    pattern: /([A-Za-z_0-9]+) +((-?->)|(<-?-)) +([A-Za-z_0-9]+)(:).*\n/m,
    inside: {
      name: {
        pattern: /[A-Za-z_0-9]+/m,
        alias: 'tag'
      },
      relation: {
        pattern: /(-?->)|(<-?-)/m,
        alias: 'operator'
      }
    }
  },
  doubeQuoted: {
    pattern: /\".*\"/m,
    alias: 'string'
  },
  quoted: {
    pattern: /\'.*\'/m,
    alias: 'string'
  },
  constant: {
    pattern: /\b[A-Z]+[A-Za-z_0-9]*\b/,
    alias: 'property'
  },
  variable: {
    pattern: /\b[a-z_]+[A-Za-z_0-9]*\b/,
    alias: 'tag'
  }
}