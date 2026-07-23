var STORAGE_KEY = 'find-the-bug-state';
var ROUND_SIZE = 5;
var roundQuestions = [];
var roundIndex = 0;

var levels = {
    easy: [
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t\ti++;\n\treturn (i + 1);\n}",
            answers: [
                "Off-by-one: should return i",
                "Missing semicolon",
                "Infinite loop"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t\td[i] = s[i];\n\treturn (d);\n}",
            answers: [
                "Missing i++ inside loop",
                "Wrong return type",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\twhile (a[i] == b[i])\n\t\ti++;\n\treturn (a[i] > b[i]);\n}",
            answers: [
                "Boolean return instead of difference",
                "Wrong pointer type",
                "Missing parentheses"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = -1;\n\twhile (s[i])\n\t\ti++;\n\treturn (i);\n}",
            answers: [
                "Starts at -1, dereferences invalid memory",
                "Missing braces",
                "Wrong return type"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\twhile (s[i])\n\t\ti++;\n\treturn (i);\n}",
            answers: [
                "i is uninitialized",
                "Missing semicolon",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (*s)\n\t{\n\t\ti++;\n\t}\n\treturn (i);\n}",
            answers: [
                "Pointer never increments",
                "Wrong type",
                "Missing return"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\td[i] = s[i];\n\treturn (d);\n}",
            answers: [
                "Copies only one character",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i] != 1)\n\t\td[i] = s[i];\n\treturn (d);\n}",
            answers: [
                "Wrong loop condition",
                "Missing braces",
                "Wrong return"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (a[i] - b[i]);\n}",
            answers: [
                "Does not compare full string",
                "Wrong type",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\twhile (a[i] && b[i])\n\t\ti++;\n\treturn (0);\n}",
            answers: [
                "Always returns 0",
                "Wrong pointer",
                "Missing increment"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_alpha(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] < 'A' && s[i] > 'Z')\n\t\treturn (0);\n\treturn (1);\n}",
            answers: [
                "Impossible condition (<A && >Z)",
                "Wrong return",
                "Missing increment"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_alpha(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 'A')\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Does not check lowercase letters",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_numeric(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] < 48 || s[i] > 58)\n\t\treturn (0);\n\treturn (1);\n}",
            answers: [
                "ASCII 58 is ':'; '9' is 57",
                "Wrong type",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_numeric(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < '0')\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Does not check upper bound ('9')",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_printable(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] > 127)\n\t\treturn (0);\n\treturn (1);\n}",
            answers: [
                "Printable ends at 126",
                "Wrong type",
                "Missing increment"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strupcase(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\ts[i] = s[i] + 32;\n\t\ti++;\n\t}\n\treturn (s);\n}",
            answers: [
                "Adds 32 (lowercases instead of uppercases)",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strlowcase(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\ts[i] = s[i] - 32;\n\t\ti++;\n\t}\n\treturn (s);\n}",
            answers: [
                "Subtracts 32 (uppercases instead of lowercases)",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcapitalize(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] >= 'a' && s[i] <= 'z')\n\t\ts[i] -= 32;\n\treturn (s);\n}",
            answers: [
                "Does not lowercase rest of string first",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "unsigned int\tft_strlcpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n && s[i])\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\treturn (i);\n}",
            answers: [
                "Must return length of src",
                "Missing null terminator",
                "Wrong type"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twhile (*s)\n\t\twrite(1, s, 1);\n}",
            answers: [
                "Pointer never increments",
                "Wrong fd",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twrite(1, s, 100);\n}",
            answers: [
                "Writes too many bytes",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tchar c;\n\tc = n % 10;\n\twrite(1, &c, 1);\n}",
            answers: [
                "Digit not converted to ASCII",
                "Wrong fd",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tif (n < 0)\n\t\tn = -n;\n\twrite(1, &n, 1);\n}",
            answers: [
                "INT_MIN cannot be negated",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\ti = 0;\n\treturn (s[i] - '0');\n}",
            answers: [
                "Ignores entire string except first char",
                "Wrong type",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] == '-')\n\t\treturn (-1);\n\treturn (1);\n}",
            answers: [
                "Ignores digits completely",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (s[i] - '0');\n}",
            answers: [
                "Wrong digit mapping for base",
                "Missing braces",
                "Wrong return type"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (1);\n}",
            answers: [
                "Always returns 1",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcat(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (d[i])\n\t\ti++;\n\td[i] = s[0];\n\treturn (d);\n}",
            answers: [
                "Copies only first char of src",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncat(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\td[0] = s[0];\n\treturn (d);\n}",
            answers: [
                "Does not append correctly",
                "Wrong type",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strstr(char *h, char *n)\n{\n\treturn (h);\n}",
            answers: [
                "Always returns haystack",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        }
    ]
    ,
    medium: [
        {
            code: "int\tft_str_is_printable(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 32 || s[i] > 127)\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "127 is not printable (should be 126)",
                "Missing increment",
                "Wrong return type"
            ],
            correct: 0
        },
        {
            code: "unsigned int\tft_strlcpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n && s[i])\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\td[i] = '\\0';\n\treturn (i);\n}",
            answers: [
                "Must return length of src",
                "Wrong null terminator",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcapitalize(char *s)\n{\n\tint i;\n\ti = 0;\n\tif (s[i] >= 'a' && s[i] <= 'z')\n\t\ts[i] -= 32;\n\treturn (s);\n}",
            answers: [
                "Does not lowercase entire string first",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_alpha(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (!(s[i] >= 'A' && s[i] <= 'Z'))\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Does not check lowercase letters",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_numeric(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < '0' || s[i] > '9')\n\t\t\treturn (1);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Returns reversed logic",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\treturn (d);\n}",
            answers: [
                "Does not stop at end of src",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (s[i] && i < n)\n\t{\n\t\td[i] = s[i];\n\t}\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Missing i++ inside loop",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\twhile (a[i] && b[i] && a[i] == b[i])\n\t\ti++;\n\treturn (a[i] == b[i]);\n}",
            answers: [
                "Returns boolean instead of difference",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\twhile (a[i] == b[i])\n\t{\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Always returns 1",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\td[i] = s[i];\n\t\ti = i + 2;\n\t}\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Skips characters (i += 2)",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\td[i] = s[i];\n\t}\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Missing i++ inside loop",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i] != '\\n')\n\t\ti++;\n\treturn (i);\n}",
            answers: [
                "Stops at newline instead of null terminator",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 1;\n\twhile (s[i])\n\t\ti++;\n\treturn (i);\n}",
            answers: [
                "Starts at 1 instead of 0",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twhile (*s)\n\t{\n\t\twrite(1, s, 2);\n\t\ts++;\n\t}\n}",
            answers: [
                "Writes 2 bytes instead of 1",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twhile (*s)\n\t{\n\t\twrite(1, &s, 1);\n\t\ts++;\n\t}\n}",
            answers: [
                "Wrong pointer passed to write",
                "Wrong fd",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tchar c;\n\tif (n < 0)\n\t{\n\t\twrite(1, \"-\", 1);\n\t\tn = n * -1;\n\t}\n\tc = n % 10;\n\twrite(1, &c, 1);\n}",
            answers: [
                "Digit not converted to ASCII",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tif (n < 0)\n\t{\n\t\tn = -n;\n\t}\n\twrite(1, &n, 1);\n}",
            answers: [
                "INT_MIN cannot be negated",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr_base(int n, char *b)\n{\n\tint len;\n\tlen = 0;\n\twhile (b[len])\n\t\tlen++;\n\twrite(1, &b[n], 1);\n}",
            answers: [
                "Does not convert number to base",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr_base(int n, char *b)\n{\n\tif (n < 0)\n\t{\n\t\twrite(1, \"-\", 1);\n\t\tn = -n;\n\t}\n\twrite(1, b, 1);\n}",
            answers: [
                "Writes entire base string instead of digit",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\tint res;\n\ti = 0;\n\tres = 0;\n\twhile (s[i] >= '0' && s[i] <= '9')\n\t{\n\t\tres = res + (s[i] - '0');\n\t\ti++;\n\t}\n\treturn (res);\n}",
            answers: [
                "Does not multiply by 10",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\tint res;\n\ti = 0;\n\tres = 0;\n\twhile (s[i])\n\t{\n\t\tres = res * 10 + s[i];\n\t\ti++;\n\t}\n\treturn (res);\n}",
            answers: [
                "Uses raw ASCII instead of '0' offset",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\tint res;\n\ti = 0;\n\tres = 0;\n\twhile (s[i])\n\t{\n\t\tres = res * 10 + (s[i] - '0');\n\t\ti++;\n\t}\n\treturn (res);\n}",
            answers: [
                "Uses base 10 logic instead of base length",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (s[i]);\n}",
            answers: [
                "Returns raw ASCII instead of converted value",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcat(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (d[i])\n\t\ti++;\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Does not append src",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncat(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (d[i])\n\t\ti++;\n\td[i] = s[0];\n\treturn (d);\n}",
            answers: [
                "Appends only first char of src",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strstr(char *h, char *n)\n{\n\tint i;\n\ti = 0;\n\twhile (h[i])\n\t{\n\t\tif (h[i] == n[0])\n\t\t\treturn (h);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Returns haystack instead of match position",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strstr(char *h, char *n)\n{\n\treturn (n);\n}",
            answers: [
                "Always returns needle",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\td[i] = '\\0';\n\t\ti++;\n\t}\n\treturn (d);\n}",
            answers: [
                "Never copies src",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_printable(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 32)\n\t\t\treturn (1);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Logic reversed",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_alpha(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] > 'z')\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Does not check uppercase letters",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        }
    ],
    hard: [
        {
            code: "void\tft_putnbr(int n)\n{\n\tchar c;\n\tif (n < 0)\n\t{\n\t\twrite(1, \"-\", 1);\n\t\tn = -n;\n\t}\n\tc = n % 10;\n\twrite(1, &c, 1);\n}",
            answers: [
                "INT_MIN cannot be negated",
                "Digit not converted to ASCII",
                "Wrong file descriptor"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tif (n < 0)\n\t{\n\t\tn = -n;\n\t}\n\twrite(1, &n, 1);\n}",
            answers: [
                "INT_MIN cannot be negated",
                "Writes raw int bytes",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr(int n)\n{\n\tchar c;\n\tc = n;\n\twrite(1, &c, 1);\n}",
            answers: [
                "Does not convert number to digits",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr_base(int n, char *b)\n{\n\tint len;\n\tlen = 0;\n\twhile (b[len])\n\t\tlen++;\n\twrite(1, &b[n], 1);\n}",
            answers: [
                "Does not convert number to base",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr_base(int n, char *b)\n{\n\twrite(1, b, 1);\n}",
            answers: [
                "Writes first base char only",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putnbr_base(int n, char *b)\n{\n\tif (n < 0)\n\t{\n\t\tn = -n;\n\t}\n\twrite(1, &n, 1);\n}",
            answers: [
                "INT_MIN cannot be negated",
                "Writes raw int",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\tint res;\n\ti = 0;\n\tres = 0;\n\twhile (s[i])\n\t{\n\t\tres = res * 10 + s[i];\n\t\ti++;\n\t}\n\treturn (res);\n}",
            answers: [
                "Uses raw ASCII instead of digit",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\tint res;\n\tint sign;\n\ti = 0;\n\tres = 0;\n\tsign = 1;\n\tif (s[i] == '-')\n\t\tsign = sign * sign;\n\treturn (res);\n}",
            answers: [
                "Sign logic wrong",
                "Ignores digits",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\ti = 0;\n\treturn (s[i] * 10);\n}",
            answers: [
                "Uses ASCII directly",
                "Ignores rest of string",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (s[i] - '0');\n}",
            answers: [
                "Wrong digit mapping for base",
                "Missing braces",
                "Wrong return type"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\tint i;\n\tint res;\n\ti = 0;\n\tres = 0;\n\twhile (s[i])\n\t{\n\t\tres = res + (s[i] - '0');\n\t\ti++;\n\t}\n\treturn (res);\n}",
            answers: [
                "Does not multiply by base length",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_atoi_base(char *s, char *b)\n{\n\treturn (1);\n}",
            answers: [
                "Always returns 1",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\td[i] = s[i] + 1;\n\t\ti++;\n\t}\n\treturn (d);\n}",
            answers: [
                "Adds 1 to every character",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 1;\n\twhile (i < n)\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\treturn (d);\n}",
            answers: [
                "Starts copying at index 1",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Copies nothing",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\td[i] = s[i] + 5;\n\treturn (d);\n}",
            answers: [
                "Adds 5 to character",
                "Copies only one char",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\td[i] = s[i] * 2;\n\t\ti++;\n\t}\n\td[i] = '\\0';\n\treturn (d);\n}",
            answers: [
                "Multiplies ASCII values",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\treturn (a[i] * b[i]);\n}",
            answers: [
                "Multiplies ASCII values",
                "Does not compare strings",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\tint i;\n\ti = 0;\n\twhile (a[i] && b[i])\n\t{\n\t\tif (a[i] != b[i])\n\t\t\treturn (1);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Always returns 1",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strcmp(char *a, char *b)\n{\n\treturn (a[0] - b[0]);\n}",
            answers: [
                "Compares only first character",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\ti = i + 3;\n\t}\n\treturn (i);\n}",
            answers: [
                "Skips characters (i += 3)",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\ti--;\n\t}\n\treturn (i);\n}",
            answers: [
                "Decrements i → infinite loop",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twhile (*s)\n\t{\n\t\twrite(1, s, 10);\n\t\ts++;\n\t}\n}",
            answers: [
                "Writes 10 bytes instead of 1",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "void\tft_putstr(char *s)\n{\n\twrite(1, s, 0);\n}",
            answers: [
                "Writes 0 bytes",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcat(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (d[i])\n\t\ti++;\n\td[i] = s[i];\n\treturn (d);\n}",
            answers: [
                "Uses same index for both strings",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strcat(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\td[0] = s[0];\n\treturn (d);\n}",
            answers: [
                "Does not append",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strncat(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\td[i] = s[i] + 1;\n\t\ti++;\n\t}\n\treturn (d);\n}",
            answers: [
                "Adds 1 to ASCII",
                "Does not append to end of d",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strstr(char *h, char *n)\n{\n\tint i;\n\ti = 0;\n\twhile (h[i])\n\t{\n\t\tif (h[i] == n[i])\n\t\t\treturn (h);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Compares wrong indices",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "char\t*ft_strstr(char *h, char *n)\n{\n\treturn (h + 100);\n}",
            answers: [
                "Returns invalid pointer",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_alpha(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 'A')\n\t\t\treturn (1);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Logic reversed",
                "Does not check lowercase",
                "Wrong pointer"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_numeric(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] > '9')\n\t\t\treturn (1);\n\t\ti++;\n\t}\n\treturn (0);\n}",
            answers: [
                "Logic reversed",
                "Wrong pointer",
                "Missing semicolon"
            ],
            correct: 0
        },
        {
            code: "int\tft_str_is_printable(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 32 || s[i] > 200)\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            answers: [
                "Upper bound 200 is invalid",
                "Wrong pointer",
                "Missing braces"
            ],
            correct: 0
        }
    ]

};

var currentLevel = 'easy';
var currentIndex = 0;
var score = 0;

var codeEl = document.getElementById('code-snippet');
var scoreEl = document.getElementById('score');
var levelEl = document.getElementById('level');
var counterEl = document.getElementById('question-counter');
var feedbackEl = document.getElementById('feedback');
var timerEl = document.getElementById('timer');
var btnNext = document.getElementById('btn-next');
var levelButtons = document.querySelectorAll('#level-select [role="radio"]');
var answersEl = document.getElementById('answers');

var summaryEl = document.getElementById('summary');
var summaryLevelEl = document.getElementById('summary-level');
var summaryQuestionsEl = document.getElementById('summary-questions');
var summaryScoreEl = document.getElementById('summary-score');
var summaryBackBtn = document.getElementById('summary-back');

var timeLeft;
var timerId;

function loadState() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return;
    }
    var state = JSON.parse(raw);
    if (state.level && levels[state.level]) {
        currentLevel = state.level;
    }
    if (typeof state.index === 'number') {
        currentIndex = state.index;
    }
    if (typeof state.score === 'number') {
        score = state.score;
    }
}

function saveState() {
    var state = {
        level: currentLevel,
        index: currentIndex,
        score: score
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateLevelButtons() {
    levelButtons.forEach(function (btn) {
        var lvl = btn.getAttribute('data-level');
        var checked = lvl === currentLevel;
        btn.setAttribute('aria-checked', checked ? 'true' : 'false');
    });
}

function stopTimer() {
    clearInterval(timerId);
}

function startTimer() {
    timeLeft = 20;
    timerEl.textContent = 'Time: ' + timeLeft;

    timerId = setInterval(function () {
        timeLeft = timeLeft - 1;
        timerEl.textContent = 'Time: ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            feedbackEl.textContent = 'Time is up!';
        }
    }, 1000);
}

function startNewRound() {
    var pool = levels[currentLevel];
    var used = {};

    roundQuestions = [];
    roundIndex = 0;

    var count = 0;
    while (count < ROUND_SIZE) {
        var r = Math.floor(Math.random() * pool.length);
        if (!used[r]) {
            used[r] = true;
            roundQuestions.push(pool[r]);
            count++;
        }
    }

    currentIndex = 0;
    renderQuestion();
}

function renderQuestion() {
    stopTimer();

    var q = roundQuestions[roundIndex];

    codeEl.textContent = q.code;
    counterEl.textContent = "Question " + (roundIndex + 1) + " / " + ROUND_SIZE;
    levelEl.textContent = "Level: " + currentLevel;
    scoreEl.textContent = "Score: " + score;
    feedbackEl.textContent = "";

    answersEl.innerHTML = "";
    var i;
    i = 0;
    while (i < q.answers.length) {
        var btn = document.createElement("button");
        btn.textContent = q.answers[i];
        btn.setAttribute("data-index", i);
        btn.setAttribute("role", "button");

        btn.addEventListener("click", function (e) {
            var idx = parseInt(e.target.getAttribute("data-index"));
            if (idx === q.correct) {
                score = score + 1;
                feedbackEl.textContent = "Correct!";
            } else {
                feedbackEl.textContent = "Wrong!";
            }

            saveState();

            setTimeout(function () {
                nextQuestion();
            }, 600);
        });

        answersEl.appendChild(btn);
        i = i + 1;
    }

    updateLevelButtons();
    saveState();
    startTimer();
}

function showSummary() {
    summaryLevelEl.textContent = "Level: " + currentLevel;
    summaryQuestionsEl.textContent = "Questions answered: " + ROUND_SIZE;
    summaryScoreEl.textContent = "Correct answers: " + score;

    summaryEl.hidden = false;
    document.querySelector("main").hidden = true;

    summaryBackBtn.addEventListener("click", function () {
        summaryEl.hidden = true;
        document.querySelector("main").hidden = false;
        startNewRound();
    });

}

summaryBackBtn.addEventListener('click', function () {
    summaryEl.hidden = true;
    document.querySelector('main').hidden = false;
    renderQuestion();
});

levelButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        currentLevel = btn.getAttribute('data-level');
        currentIndex = 0;
        renderQuestion();
    });
});

function nextQuestion() {
    roundIndex = roundIndex + 1;

    if (roundIndex >= ROUND_SIZE) {
        showSummary();
        return;
    }

    renderQuestion();
}


btnNext.addEventListener('click', function () {
    var len = levels[currentLevel].length;
    if (currentIndex + 1 >= len) {
        showSummary();
        return;
    }
    currentIndex = currentIndex + 1;
    renderQuestion();
});

document.addEventListener('keydown', function (e) {
    if (e.key === "1") {
        var b0 = document.querySelector('#answers button[data-index="0"]');
        if (b0) b0.click();
    }
    if (e.key === "2") {
        var b1 = document.querySelector('#answers button[data-index="1"]');
        if (b1) b1.click();
    }
    if (e.key === "3") {
        var b2 = document.querySelector('#answers button[data-index="2"]');
        if (b2) b2.click();
    }
});

loadState();
startNewRound();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
