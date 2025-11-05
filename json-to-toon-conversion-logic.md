---
applyTo: '**'
---
Perfect! Now let me create one final summary document:***

## JSON to TOON Conversion Logic: Complete GuideThe TOON (Token-Oriented Object Notation) format achieves 30-60% token reduction compared to JSON through intelligent pattern detection and minimal syntax. Here's how the conversion works in JavaScript.

### The Core Optimization: Tabular Array DetectionThe **single most important algorithm** in TOON conversion is detecting uniform arrays of objects. This is where the token savings come from.[1]

**Tabular Array Requirements:**
- All array elements must be objects (not primitives)[1]
- Every object must have **identical keys** in the same order[1]
- All values must be primitives (no nested arrays or objects)[1]

When these conditions are met, TOON outputs:
```
users[3]{id,name,role}:
  1,Alice,admin
  2,Bob,user
  3,Charlie,user
```

Instead of JSON's repetitive format:
```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" },
    { "id": 3, "name": "Charlie", "role": "user" }
  ]
}
```

**Token Savings Mechanism:** Keys are declared once in the header (`{id,name,role}:`) instead of repeating for every row. This compounds savings significantly with large datasets.[1]

### Conversion ArchitectureThe JavaScript encoder follows this decision tree:

1. **Input Type Dispatch**: Check if input is array, object, or primitive
2. **Array Processing**: 
   - Primitive array → inline format (`tags[3]: a,b,c`)
   - Object array → detect tabular → tabular format OR list format
3. **Object Processing**: Encode each key-value pair with proper indentation
4. **Primitive Processing**: Apply quoting rules based on TOON syntax requirements

### Key Implementation Functions**Main Encoder Entry Point:**
```javascript
function encode(value, options = {}) {
  const encoder = new ToonEncoder({
    indent: options.indent ?? 2,
    delimiter: options.delimiter ?? ',',
    lengthMarker: options.lengthMarker ?? false,
  });
  return encoder.encode(value);
}
```

**Tabular Detection Logic** (the critical function):
```javascript
_isTabularArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return false;

  const firstElement = arr[0];
  if (typeof firstElement !== 'object' || Array.isArray(firstElement)) {
    return false;
  }

  const firstKeys = Object.keys(firstElement).sort();

  for (const element of arr) {
    // Check all objects have identical keys
    const elementKeys = Object.keys(element).sort();
    if (!this._keysEqual(firstKeys, elementKeys)) return false;

    // Check all values are primitives (no nested structures)
    for (const value of Object.values(element)) {
      if (typeof value === 'object' && value !== null) return false;
    }
  }

  return true;
}
```

### Encoding Different Formats**Tabular Array Encoding** (achieves 50-60% savings):
```javascript
_encodeTabularArray(arr, propertyName) {
  const firstObj = arr[0];
  const fields = Object.keys(firstObj);

  // Build header: key[N]{field1,field2,...}:
  const fieldHeader = fields.join(this.options.delimiter);
  const header = `${indent}${key}[${arr.length}]{${fieldHeader}}:`;

  // Encode rows: one per line, delimiter-separated
  const rows = arr.map(obj => {
    const values = fields
      .map(field => this._quoteValue(String(obj[field])))
      .join(this.options.delimiter);
    return `${indent}  ${values}`;
  });

  return [header, ...rows].join('\n');
}
```

**List Array Encoding** (for non-uniform data):
```javascript
_encodeListArray(arr, propertyName) {
  const header = `${indent}${key}[${arr.length}]:`;
  const items = arr.map(item => {
    if (Array.isArray(item)) return `${indent}- [${item.length}]: ...`;
    if (typeof item === 'object') return `${indent}- key: value`;
    return `${indent}- ${item}`;
  });
  return [header, ...items].join('\n');
}
```

**Primitive Array Encoding** (inline):
```javascript
_encodePrimitiveArray(arr) {
  const values = arr
    .map(v => this._quoteValue(String(v)))
    .join(this.options.delimiter);
  return `${indent}[${arr.length}]: ${values}`;
}
```

### Quoting RulesTOON minimizes unnecessary quoting by only quoting when required for syntax preservation:

Quote a string if it:
- Is empty `""`
- Has leading/trailing spaces `" text "`
- Contains the active delimiter `,`, `\t`, or `|`
- Contains a colon `:` (key-value separator)
- Contains quotes or backslashes
- Looks like a boolean/number/null (`"true"`, `"42"`, `"null"`)
- Starts with list syntax `"- item"`
- Looks like structural syntax `"[5]"` or `"{key}"`

**Escape Rules:**
- Backslash: `\` → `\\`
- Quote: `"` → `\"`
- Newline: `\n` → `\\n`
- Tab: `\t` → `\\t`
- Carriage return: `\r` → `\\r`

### Optional Configurations**Tab Delimiter** (often more efficient for tokens):
```javascript
encode(data, { delimiter: '\t' })
// Output shows tabs explicitly in header: items[2 ]{id name qty}:
```

**Pipe Delimiter** (alternative):
```javascript
encode(data, { delimiter: '|' })
// Output: items[2|]{id|name|qty}:
```

**Length Marker** (emphasizes array count):
```javascript
encode(data, { lengthMarker: '#' })
// Output: items[#2]{id,name,role}:
```

### Token Savings by Data Type| Scenario | Reduction | Reason |
|----------|-----------|--------|
| Uniform tabular data (100+ rows) | 50-60% | Keys declared once, CSV-like rows |
| Deeply nested objects | 10-20% | Indentation replaces braces |
| Mixed/non-uniform arrays | 0-10% | Falls back to list format like JSON |
| Small datasets | 20-30% | Overhead from minimal syntax |
| Analytics data (time-series) | 35-60% | Highly uniform structure |
| GitHub repositories | 40-50% | Moderate uniformity with descriptions |

### Recursive ProcessingThe encoder handles nested structures through recursion:
- Nested objects: increment depth, encode fields, decrement depth
- Nested arrays: same recursive pattern
- Maintains proper indentation at each level

### Type NormalizationSpecial handling for non-JSON types:
- `Date` objects → ISO string in quotes
- `BigInt` → decimal string (quoted if > safe integer)
- `NaN`, `Infinity` → `null`
- `undefined` → `null`
- Functions, symbols → `null`
- Numbers in scientific notation → converted to decimal form

### Complete Workflow Example```javascript
// Input: JavaScript object
const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin', active: true },
    { id: 2, name: 'Bob', role: 'user', active: false }
  ],
  metadata: { version: 1, created: '2025-01-01' }
};

// 1. Create encoder with options
const encoder = new ToonEncoder({
  indent: 2,
  delimiter: ',',
  lengthMarker: false
});

// 2. Call encode() - triggers type detection
const toon = encoder.encode(data);

// 3. Output (tabular format detected for users array):
// users[2]{id,name,role,active}:
//   1,Alice,admin,true
//   2,Bob,user,false
// metadata:
//   version: 1
//   created: 2025-01-01
```

### When to Use TOON✅ **Use TOON when:**
- Working with uniform tabular data (same fields per row)
- Sending data to LLMs (token costs matter)
- Data contains 10+ rows of similar objects
- Token efficiency is a priority

❌ **Use JSON when:**
- Data is deeply nested (3+ levels)
- Objects have varying fields
- Compatibility with existing tools is critical
- Dataset is very small (<10 items)

For a complete working implementation, see the JavaScript files provided which include the full ToonEncoder class with all decision logic, quoting rules, and formatting options.
