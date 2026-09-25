import type { CFundamentalLesson } from '../types/lms';

export interface CCategory {
  id: string;
  title: string;
}

export const C_CATEGORIES: CCategory[] = [
  {
    "id": "tutorial",
    "title": "C TUTORIAL"
  },
  {
    "id": "functions",
    "title": "C FUNCTIONS"
  },
  {
    "id": "files",
    "title": "C FILES"
  },
  {
    "id": "structures",
    "title": "C STRUCTURES"
  },
  {
    "id": "enums",
    "title": "C ENUMS"
  },
  {
    "id": "memory",
    "title": "C MEMORY"
  },
  {
    "id": "errors",
    "title": "C ERRORS"
  },
  {
    "id": "more",
    "title": "C MORE"
  },
  {
    "id": "projects",
    "title": "C PROJECTS"
  },
  {
    "id": "cert",
    "title": "C CERT"
  },
  {
    "id": "reference",
    "title": "C REFERENCE"
  },
  {
    "id": "examples",
    "title": "C EXAMPLES"
  }
];

export const C_TUTORIAL_LESSONS: CFundamentalLesson[] = [
  {
    "id": "c-home",
    "title": "C HOME",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion. It was developed in 1972 by Dennis Ritchie at Bell Labs. C is one of the most widely used programming languages of all time, powering operating systems (Linux, Windows, macOS), embedded microcontrollers, and foundational data structure engines.",
    "syntax": "#include <stdio.h>\n\nint main() {\n    // Code statements execute sequentially\n    printf(\"Hello, World!\\n\");\n    return 0; // Signals successful termination\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to C Programming for Data Structures!\\n\");\n    printf(\"Anna University 2025 Regulation Standard.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"C is fast, efficient, and close to the hardware.\\n\");\n    return 0;\n}",
    "expectedOutput": "C is fast, efficient, and close to the hardware.",
    "exercise": {
      "question": "What does return 0; indicate at the end of main()?",
      "starterCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Test\");\n    return 0;\n}",
      "solution": "Successful program execution without error",
      "hint": "A return code of 0 informs the operating system of standard clean exit."
    },
    "order": 1
  },
  {
    "id": "c-intro",
    "title": "C Intro",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Why learn C? C gives developers direct memory manipulation through pointers, minimal runtime overhead, and deterministic execution speed. Modern languages like C++, C#, Java, JavaScript, and Python have syntax derived directly from C. Understanding C is the single most vital prerequisite for understanding Data Structures and operating systems.",
    "syntax": "/* Standard C Program Skeleton */\n#include <stdio.h>   // Preprocessor directive for Standard Input/Output\n\nint main(void) {     // Program entry point\n    // Logic goes here\n    return 0;        // Exit status\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int year = 1972;\n    char creator[] = \"Dennis Ritchie\";\n    printf(\"C created in %d by %s at Bell Labs.\\n\", year, creator);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"C Language provides direct memory access via pointers.\\n\");\n    return 0;\n}",
    "expectedOutput": "C Language provides direct memory access via pointers.",
    "exercise": {
      "question": "Which header file is required to use printf() and scanf()?",
      "starterCode": "#include <stdio.h>",
      "solution": "<stdio.h>",
      "hint": "stdio stands for Standard Input Output."
    },
    "order": 2
  },
  {
    "id": "c-get-started",
    "title": "C Get Started",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "To write C code, you need a text editor and a C compiler such as GCC or Clang. In this platform, a native GCC WebAssembly runtime is built into every page so you can edit, compile, and run code instantly without installing external tools.",
    "syntax": "// Compiling with gcc in command line:\n// gcc -Wall -O2 program.c -o program\n// ./program",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Ready to write C programs!\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Environment initialized and ready for compilation.\\n\");\n    return 0;\n}",
    "expectedOutput": "Environment initialized and ready for compilation.",
    "exercise": {
      "question": "What command compiles a C file named main.c with gcc?",
      "starterCode": "gcc main.c -o main",
      "solution": "gcc main.c -o main",
      "hint": "Use the -o flag to specify the output binary name."
    },
    "order": 3
  },
  {
    "id": "c-syntax",
    "title": "C Syntax",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "C syntax consists of tokens, keywords, identifiers, literals, and operators. Every statement in C must terminate with a semicolon (;). Curly braces ({ and }) delineate blocks of code such as function bodies and loop scopes.",
    "syntax": "type variable_name = value;\nfunction_name(arguments);\n; // Semicolon terminates every executable statement",
    "examples": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int sum = a + b;\n    printf(\"Sum of %d and %d is %d\\n\", a, b, sum);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf(\"x = %d\\n\", x);\n    return 0;\n}",
    "expectedOutput": "x = 5",
    "exercise": {
      "question": "What symbol ends every statement in C?",
      "starterCode": ";",
      "solution": "; (semicolon)",
      "hint": "Forgetting this character is the most common beginner compiler error."
    },
    "order": 4
  },
  {
    "id": "c-output",
    "title": "C Output",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Output in C is printed to standard output (stdout) using the printf() function defined in <stdio.h>. Format specifiers like %d (integers), %f (floats), %c (characters), and %s (strings) interpolate variable values into the format string.",
    "syntax": "printf(\"format string with %specifier\", value1, value2);\n// \\n = newline\n// \\t = horizontal tab\n// \\\\ = backslash",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Integer: %d\\n\", 100);\n    printf(\"Float: %.2f\\n\", 3.14159);\n    printf(\"Char: %c\\n\", 'A');\n    printf(\"String: %s\\n\", \"Data Structures\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Line 1\\nLine 2\\nLine 3\\n\");\n    return 0;\n}",
    "expectedOutput": "Line 1\nLine 2\nLine 3",
    "exercise": {
      "question": "What format specifier is used to print an integer in printf?",
      "starterCode": "%d",
      "solution": "%d or %i",
      "hint": "Stands for decimal integer."
    },
    "order": 5
  },
  {
    "id": "c-comments",
    "title": "C Comments",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Comments explain code and prevent code execution during debugging. Single-line comments start with //, and multi-line comments start with /* and end with */. The C preprocessor strips comments before compilation.",
    "syntax": "// Single-line comment\n\n/*\n   Multi-line comment\n   spans multiple lines\n*/",
    "examples": "#include <stdio.h>\n\nint main() {\n    // This is an inline explanatory note\n    int items = 50; /* items count */\n    printf(\"Items: %d\\n\", items);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    // Print greeting\n    printf(\"Comments do not affect binary size or speed.\\n\");\n    return 0;\n}",
    "expectedOutput": "Comments do not affect binary size or speed.",
    "exercise": {
      "question": "How do you open and close a multi-line comment in C?",
      "starterCode": "/* ... */",
      "solution": "/* and */",
      "hint": "Slash asterisk to begin, asterisk slash to end."
    },
    "order": 6
  },
  {
    "id": "c-variables",
    "title": "C Variables",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "A variable is a named storage location in computer memory that holds a value. In C, all variables are statically typed: you must declare the data type before using the variable. Memory for local variables is allocated on the runtime call stack.",
    "syntax": "type variableName = value; // Declaration and initialization\ntype a, b, c;             // Multiple declarations",
    "examples": "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float score = 94.5;\n    char grade = 'A';\n    printf(\"Student Age: %d, Score: %.1f, Grade: %c\\n\", age, score, grade);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int length = 12;\n    int width = 8;\n    int area = length * width;\n    printf(\"Area = %d\\n\", area);\n    return 0;\n}",
    "expectedOutput": "Area = 96",
    "exercise": {
      "question": "Can a variable name in C start with a digit?",
      "starterCode": "No",
      "solution": "No, variable names must start with a letter or underscore.",
      "hint": "Identifiers must begin with [a-zA-Z_]."
    },
    "order": 7
  },
  {
    "id": "c-data-types",
    "title": "C Data Types",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Basic data types in C include int (typically 4 bytes), float (4 bytes, single-precision), double (8 bytes, double-precision), and char (1 byte). Modifiers like signed, unsigned, short, and long alter the range and storage size of integer types.",
    "syntax": "int a;          // 4 bytes: -2,147,483,648 to 2,147,483,647\nunsigned int b; // 4 bytes: 0 to 4,294,967,295\nfloat f;        // 4 bytes: ~7 decimal digits precision\ndouble d;       // 8 bytes: ~15 decimal digits precision\nchar c;         // 1 byte: -128 to 127 or 0 to 255",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"sizeof(int): %zu bytes\\n\", sizeof(int));\n    printf(\"sizeof(char): %zu bytes\\n\", sizeof(char));\n    printf(\"sizeof(double): %zu bytes\\n\", sizeof(double));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"int: %zu bytes\\n\", sizeof(int));\n    printf(\"char: %zu byte\\n\", sizeof(char));\n    return 0;\n}",
    "expectedOutput": "int: 4 bytes\nchar: 1 byte",
    "exercise": {
      "question": "What is the standard size of char in C?",
      "starterCode": "1 byte",
      "solution": "1 byte (8 bits)",
      "hint": "By definition in standard C, sizeof(char) is always 1."
    },
    "order": 8
  },
  {
    "id": "c-type-conversion",
    "title": "C Type Conversion",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Type conversion converts a value from one data type to another. Implicit conversion (type coercion) occurs automatically when a smaller type is assigned to a larger type. Explicit conversion (type casting) is specified manually using (type) value.",
    "syntax": "// Implicit conversion\nfloat f = 9; // 9 integer becomes 9.0 float\n\n// Explicit cast\nfloat result = (float) 5 / 2; // Produces 2.5 rather than 2",
    "examples": "#include <stdio.h>\n\nint main() {\n    int total = 17;\n    int count = 5;\n    double avg = (double) total / count;\n    printf(\"Exact Average: %.2f\\n\", avg);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int a = 15;\n    int b = 4;\n    printf(\"Division: %.2f\\n\", (float)a / b);\n    return 0;\n}",
    "expectedOutput": "Division: 3.75",
    "exercise": {
      "question": "What is 7 / 2 in C without type casting?",
      "starterCode": "3",
      "solution": "3 (integer division truncates the fractional part)",
      "hint": "Both operands are int, so integer division is performed."
    },
    "order": 9
  },
  {
    "id": "c-constants",
    "title": "C Constants",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Constants are immutable values that cannot be modified after definition. In C, constants can be defined using the const keyword (type-safe, memory allocated) or the #define preprocessor directive (literal text substitution).",
    "syntax": "const type CONSTANT_NAME = value;\n#define CONSTANT_NAME value",
    "examples": "#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    const int MAX_USERS = 100;\n    printf(\"PI = %.5f, MAX_USERS = %d\\n\", PI, MAX_USERS);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#define BUFFER_SIZE 1024\n\nint main() {\n    const int MAX_NODES = 500;\n    printf(\"Buffer: %d, Max Nodes: %d\\n\", BUFFER_SIZE, MAX_NODES);\n    return 0;\n}",
    "expectedOutput": "Buffer: 1024, Max Nodes: 500",
    "exercise": {
      "question": "What happens if you try to assign a new value to a const variable in C?",
      "starterCode": "Compiler error",
      "solution": "Compile-time error (assignment of read-only variable)",
      "hint": "The const qualifier protects the identifier from alteration."
    },
    "order": 10
  },
  {
    "id": "c-operators",
    "title": "C Operators",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Operators perform operations on variables and values. C supports Arithmetic (+, -, *, /, %), Relational (==, !=, >, <, >=, <=), Logical (&&, ||, !), Bitwise (&, |, ^, ~, <<, >>), and Assignment (=, +=, -=, etc.) operators.",
    "syntax": "int sum = a + b;\nint rem = a % b; // Modulo (remainder)\nint flag = (x > 0 && y < 10); // Logical AND",
    "examples": "#include <stdio.h>\n\nint main() {\n    int a = 14, b = 4;\n    printf(\"a + b = %d\\n\", a + b);\n    printf(\"a / b = %d\\n\", a / b);\n    printf(\"a %% b = %d\\n\", a % b);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int p = 25, q = 7;\n    printf(\"Remainder: %d\\n\", p % q);\n    return 0;\n}",
    "expectedOutput": "Remainder: 4",
    "exercise": {
      "question": "Which operator returns the remainder of an integer division?",
      "starterCode": "%",
      "solution": "% (Modulo operator)",
      "hint": "Represented by the percent symbol."
    },
    "order": 11
  },
  {
    "id": "c-booleans",
    "title": "C Booleans",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Traditionally, C treats 0 as false and any non-zero value as true. In modern C (C99 and later), the <stdbool.h> header provides bool, true (1), and false (0) as standard boolean primitives.",
    "syntax": "#include <stdbool.h>\n\nbool isCompleted = true;\nbool hasError = false;",
    "examples": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    bool isQueueEmpty = true;\n    bool isStackFull = false;\n    printf(\"Empty: %d, Full: %d\\n\", isQueueEmpty, isStackFull);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    bool flag = true;\n    if (flag) {\n        printf(\"Boolean evaluation: TRUE\\n\");\n    }\n    return 0;\n}",
    "expectedOutput": "Boolean evaluation: TRUE",
    "exercise": {
      "question": "Which header file must be included in C99 to use bool, true, and false?",
      "starterCode": "<stdbool.h>",
      "solution": "<stdbool.h>",
      "hint": "Standard boolean header."
    },
    "order": 12
  },
  {
    "id": "c-if-else",
    "title": "C If...Else",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "Conditional branching executes different blocks of code based on whether a condition evaluates to true or false. Supported structures are if, if...else, if...else if...else, and the ternary operator (condition ? expr1 : expr2).",
    "syntax": "if (condition) {\n    // executes if condition is true\n} else if (other_condition) {\n    // executes if first is false and other is true\n} else {\n    // executes if all conditions are false\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int marks = 85;\n    if (marks >= 90) {\n        printf(\"Grade O\\n\");\n    } else if (marks >= 80) {\n        printf(\"Grade A+\\n\");\n    } else {\n        printf(\"Pass\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int count = 0;\n    if (count == 0) {\n        printf(\"List is empty\\n\");\n    } else {\n        printf(\"List contains elements\\n\");\n    }\n    return 0;\n}",
    "expectedOutput": "List is empty",
    "exercise": {
      "question": "What is the shorthand ternary conditional syntax in C?",
      "starterCode": "condition ? expr1 : expr2",
      "solution": "condition ? expr1 : expr2",
      "hint": "Question mark followed by colon."
    },
    "order": 13
  },
  {
    "id": "c-switch",
    "title": "C Switch",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "The switch statement tests a variable against multiple constant values called cases. When a match is found, execution continues until a break statement is encountered. A default block handles non-matching cases.",
    "syntax": "switch (expression) {\n    case const1:\n        // statements\n        break;\n    case const2:\n        // statements\n        break;\n    default:\n        // fallback statements\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int choice = 2;\n    switch (choice) {\n        case 1: printf(\"Push element\\n\"); break;\n        case 2: printf(\"Pop element\\n\"); break;\n        case 3: printf(\"Display queue\\n\"); break;\n        default: printf(\"Invalid choice\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    char op = '+';\n    switch(op) {\n        case '+': printf(\"Addition operation\\n\"); break;\n        default: printf(\"Other\\n\");\n    }\n    return 0;\n}",
    "expectedOutput": "Addition operation",
    "exercise": {
      "question": "What keyword terminates a case block to prevent fall-through in switch?",
      "starterCode": "break",
      "solution": "break",
      "hint": "Breaks execution out of the switch body."
    },
    "order": 14
  },
  {
    "id": "c-while-loop",
    "title": "C While Loop",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "A while loop repeats a block of code as long as a specified condition is true. The condition is tested before entering the loop body (entry-controlled). A do...while loop tests condition after executing the body at least once (exit-controlled).",
    "syntax": "while (condition) {\n    // executes while condition is true\n}\n\ndo {\n    // executes at least once\n} while (condition);",
    "examples": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n    while (i <= 3) {\n        printf(\"Node %d\\n\", i);\n        i++;\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int n = 3;\n    while(n > 0) {\n        printf(\"%d \", n);\n        n--;\n    }\n    printf(\"Done\\n\");\n    return 0;\n}",
    "expectedOutput": "3 2 1 Done",
    "exercise": {
      "question": "How many times does a do...while loop execute if its condition is false initially?",
      "starterCode": "1 time",
      "solution": "At least 1 time",
      "hint": "The loop condition is checked at the end."
    },
    "order": 15
  },
  {
    "id": "c-for-loop",
    "title": "C For Loop",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "The for loop is an entry-controlled loop ideal when the number of iterations is known before entering the loop. It combines initialization, condition testing, and iteration step into a single clean line.",
    "syntax": "for (initialization; condition; increment/decrement) {\n    // loop body\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 4; i++) {\n        printf(\"Array Index: %d\\n\", i);\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for(int i = 1; i <= 5; i++) {\n        sum += i;\n    }\n    printf(\"Sum 1..5 = %d\\n\", sum);\n    return 0;\n}",
    "expectedOutput": "Sum 1..5 = 15",
    "exercise": {
      "question": "Can any of the three expressions in for (;;) be omitted in C?",
      "starterCode": "Yes",
      "solution": "Yes, for(;;) creates an infinite loop.",
      "hint": "All three parts are optional."
    },
    "order": 16
  },
  {
    "id": "c-break-continue",
    "title": "C Break/Continue",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "The break statement immediately terminates the loop or switch statement and moves control to the statement following the loop. The continue statement skips the current iteration and jumps to the next iteration evaluation.",
    "syntax": "for (int i = 0; i < 10; i++) {\n    if (i == 3) continue; // Skip iteration 3\n    if (i == 7) break;    // Stop loop completely\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 6; i++) {\n        if (i == 3) continue; // skip 3\n        if (i == 5) break;    // stop at 5\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    for(int i = 1; i <= 4; i++) {\n        if(i == 2) continue;\n        printf(\"Item %d\\n\", i);\n    }\n    return 0;\n}",
    "expectedOutput": "Item 1\nItem 3\nItem 4",
    "exercise": {
      "question": "Does continue exit the entire loop?",
      "starterCode": "No",
      "solution": "No, it only skips the remainder of the current iteration.",
      "hint": "Only break exits the loop."
    },
    "order": 17
  },
  {
    "id": "c-arrays",
    "title": "C Arrays",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "An array is a collection of elements of the same data type stored in contiguous memory locations. Arrays in C are zero-indexed: the first element is at index 0 and the last element is at index n-1. In C, an array name acts as a constant pointer to its first element.",
    "syntax": "type arrayName[arraySize];\nint arr[5] = {10, 20, 30, 40, 50};\narr[0] = 100; // Access element",
    "examples": "#include <stdio.h>\n\nint main() {\n    int scores[3] = {88, 92, 79};\n    for (int i = 0; i < 3; i++) {\n        printf(\"scores[%d] = %d\\n\", i, scores[i]);\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int nums[3] = {5, 10, 15};\n    int total = nums[0] + nums[1] + nums[2];\n    printf(\"Total = %d\\n\", total);\n    return 0;\n}",
    "expectedOutput": "Total = 30",
    "exercise": {
      "question": "What is the index of the first element in a C array?",
      "starterCode": "0",
      "solution": "0 (Zero-indexed)",
      "hint": "C uses 0-based indexing."
    },
    "order": 18
  },
  {
    "id": "c-strings",
    "title": "C Strings",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "In C, strings are not a built-in primitive type. A string is an array of characters terminated by a null character (\\0). Functions from <string.h> such as strlen(), strcpy(), strcat(), and strcmp() manipulate null-terminated strings.",
    "syntax": "char str[] = \"Hello\"; // Automatically appends '\\0'\nchar manual[] = {'H', 'i', '\\0'};",
    "examples": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char topic[] = \"Linked List\";\n    printf(\"String: %s\\n\", topic);\n    printf(\"Length: %zu characters\\n\", strlen(topic));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char word[20] = \"Stack\";\n    printf(\"Word: %s, Length: %zu\\n\", word, strlen(word));\n    return 0;\n}",
    "expectedOutput": "Word: Stack, Length: 5",
    "exercise": {
      "question": "What special character marks the end of a string in C?",
      "starterCode": "\\0",
      "solution": "\\0 (null terminator)",
      "hint": "ASCII value 0."
    },
    "order": 19
  },
  {
    "id": "c-user-input",
    "title": "C User Input",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "User input from stdin is captured using scanf() or fgets(). When passing variables to scanf(), you must pass their memory address using the address-of operator (&), except for arrays/strings which already decay to pointers.",
    "syntax": "int val;\nscanf(\"%d\", &val); // & passes address\n\nchar buffer[100];\nfgets(buffer, sizeof(buffer), stdin); // Safe string reading",
    "examples": "#include <stdio.h>\n\nint main() {\n    int number = 42; // simulated input\n    printf(\"Input Value: %d\\n\", number);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int key = 7;\n    printf(\"Key registered: %d\\n\", key);\n    return 0;\n}",
    "expectedOutput": "Key registered: 7",
    "exercise": {
      "question": "Why do you pass &val to scanf(\"%d\", &val)?",
      "starterCode": "To pass the memory address so scanf can modify the variable",
      "solution": "Pass by pointer/address allows scanf to store the read value in memory",
      "hint": "C passes function arguments by value."
    },
    "order": 20
  },
  {
    "id": "c-memory-address",
    "title": "C Memory Address",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "When a variable is declared in C, a memory address is assigned to it in RAM. The address-of operator (&) retrieves the hexadecimal memory address of any variable. Format specifier %p prints pointer addresses.",
    "syntax": "int myAge = 21;\nprintf(\"%p\\n\", (void*)&myAge); // Prints memory address in hex",
    "examples": "#include <stdio.h>\n\nint main() {\n    int n = 100;\n    printf(\"Value: %d\\n\", n);\n    printf(\"Address: %p\\n\", (void*)&n);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *ptr = &a;\n    printf(\"Value via ptr: %d\\n\", *ptr);\n    return 0;\n}",
    "expectedOutput": "Value via ptr: 10",
    "exercise": {
      "question": "Which operator retrieves the memory address of a variable in C?",
      "starterCode": "&",
      "solution": "& (address-of operator)",
      "hint": "The ampersand symbol."
    },
    "order": 21
  },
  {
    "id": "c-pointers",
    "title": "C Pointers",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "A pointer is a variable that stores the memory address of another variable. The dereference operator (*) accesses or modifies the value at that address. Pointers are the foundational mechanism for linked lists, trees, graphs, and dynamic memory.",
    "syntax": "type *ptr = &variable; // Pointer declaration\n*ptr = new_value;      // Dereferencing to write\ntype value = *ptr;     // Dereferencing to read",
    "examples": "#include <stdio.h>\n\nint main() {\n    int x = 25;\n    int *p = &x;\n    printf(\"Value before: %d\\n\", x);\n    *p = 50; // Modify through pointer\n    printf(\"Value after: %d\\n\", x);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int num = 42;\n    int *p = &num;\n    printf(\"Pointer target: %d\\n\", *p);\n    return 0;\n}",
    "expectedOutput": "Pointer target: 42",
    "exercise": {
      "question": "What does *p mean when p is a pointer variable?",
      "starterCode": "Dereference p (access value at address p)",
      "solution": "Dereferencing the pointer to access the value stored at the target address",
      "hint": "Indirection operator."
    },
    "order": 22
  },
  {
    "id": "c-functions",
    "title": "C Functions",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "A function is a block of reusable code that performs a specific task. Functions improve modularity, readability, and code reuse. Every C program has at least one function: main().",
    "syntax": "return_type function_name(parameter_list) {\n    // function body\n    return value;\n}",
    "examples": "#include <stdio.h>\n\nvoid greet() {\n    printf(\"Hello from a C Function!\\n\");\n}\n\nint main() {\n    greet();\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nvoid message() {\n    printf(\"Modular C programming\\n\");\n}\n\nint main() {\n    message();\n    return 0;\n}",
    "expectedOutput": "Modular C programming",
    "order": 23
  },
  {
    "id": "c-function-parameters",
    "title": "C Function Parameters",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "Parameters act as variables inside the function. In C, arguments are passed by value by default. To modify variables from the caller, pass pointers (pass-by-reference).",
    "syntax": "void modify(int *ptr) {\n    *ptr += 10;\n}",
    "examples": "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x = 5, y = 9;\n    swap(&x, &y);\n    printf(\"x=%d, y=%d\\n\", x, y);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf(\"Sum: %d\\n\", add(10, 20));\n    return 0;\n}",
    "expectedOutput": "Sum: 30",
    "order": 24
  },
  {
    "id": "c-scope",
    "title": "C Scope",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "Scope determines the visibility and lifetime of a variable. Local variables are accessible only within the block they are declared. Global variables are accessible across the entire file.",
    "syntax": "int globalVar = 100; // Global scope\nvoid test() {\n    int localVar = 5; // Local scope\n}",
    "examples": "#include <stdio.h>\n\nint g = 50;\n\nvoid show() {\n    printf(\"Global: %d\\n\", g);\n}\n\nint main() {\n    show();\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint count = 10;\n\nint main() {\n    printf(\"Count: %d\\n\", count);\n    return 0;\n}",
    "expectedOutput": "Count: 10",
    "order": 25
  },
  {
    "id": "c-function-declaration",
    "title": "C Function Declaration",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "A function prototype (declaration) informs the compiler about the function name, return type, and parameters before its actual definition later in the file.",
    "syntax": "int multiply(int a, int b); // Function prototype",
    "examples": "#include <stdio.h>\n\nint multiply(int, int);\n\nint main() {\n    printf(\"Product: %d\\n\", multiply(6, 7));\n    return 0;\n}\n\nint multiply(int a, int b) {\n    return a * b;\n}",
    "sampleCode": "#include <stdio.h>\n\nint square(int x);\n\nint main() {\n    printf(\"Square: %d\\n\", square(8));\n    return 0;\n}\n\nint square(int x) { return x * x; }",
    "expectedOutput": "Square: 64",
    "order": 26
  },
  {
    "id": "c-functions-challenge",
    "title": "C Functions Challenge",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "Test your understanding of modular decomposition, parameter passing, and return value mechanics in C.",
    "syntax": "bool isPrime(int n);",
    "examples": "#include <stdio.h>\n\nint max(int a, int b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    printf(\"Max: %d\\n\", max(45, 82));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint max(int a, int b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    printf(\"Max: %d\\n\", max(15, 25));\n    return 0;\n}",
    "expectedOutput": "Max: 25",
    "order": 27
  },
  {
    "id": "c-math-functions",
    "title": "C Math Functions",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "The <math.h> header provides standard mathematical functions like sqrt(), pow(), ceil(), floor(), abs(), and trigonometric calculations.",
    "syntax": "#include <math.h>\ndouble sqrt(double x);\ndouble pow(double base, double exp);",
    "examples": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    printf(\"sqrt(49) = %.1f\\n\", sqrt(49.0));\n    printf(\"pow(2, 3) = %.1f\\n\", pow(2.0, 3.0));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    printf(\"Square root of 64: %.0f\\n\", sqrt(64.0));\n    return 0;\n}",
    "expectedOutput": "Square root of 64: 8",
    "order": 28
  },
  {
    "id": "c-inline-functions",
    "title": "C Inline Functions",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "The inline keyword suggests to the compiler to substitute the function body at each call site, eliminating the overhead of a function call for small, time-critical routines.",
    "syntax": "static inline int min(int a, int b) {\n    return (a < b) ? a : b;\n}",
    "examples": "#include <stdio.h>\n\nstatic inline int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf(\"Inline sum: %d\\n\", add(12, 18));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstatic inline int doubleVal(int x) {\n    return x * 2;\n}\n\nint main() {\n    printf(\"Double: %d\\n\", doubleVal(21));\n    return 0;\n}",
    "expectedOutput": "Double: 42",
    "order": 29
  },
  {
    "id": "c-recursion",
    "title": "C Recursion",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "Recursion is a programming technique where a function calls itself. A recursive function must have a base case to terminate execution and a recursive step advancing toward the base case. Essential for Trees and Graphs.",
    "syntax": "int factorial(int n) {\n    if (n <= 1) return 1; // Base case\n    return n * factorial(n - 1); // Recursive case\n}",
    "examples": "#include <stdio.h>\n\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main() {\n    printf(\"5! = %d\\n\", fact(5));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint sum(int n) {\n    if (n <= 1) return n;\n    return n + sum(n - 1);\n}\n\nint main() {\n    printf(\"Sum 1..4: %d\\n\", sum(4));\n    return 0;\n}",
    "expectedOutput": "Sum 1..4: 10",
    "order": 30
  },
  {
    "id": "c-function-pointers",
    "title": "C Function Pointers",
    "category": "functions",
    "categoryTitle": "C FUNCTIONS",
    "concepts": "A function pointer points to executable code in memory rather than data. Used for callback mechanisms, comparator functions in qsort(), and event handlers.",
    "syntax": "return_type (*func_ptr_name)(param_types);",
    "examples": "#include <stdio.h>\n\nvoid greet() {\n    printf(\"Hello from function pointer!\\n\");\n}\n\nint main() {\n    void (*ptr)() = greet;\n    ptr();\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\n\nint main() {\n    int (*op)(int, int) = add;\n    printf(\"Result: %d\\n\", op(15, 25));\n    return 0;\n}",
    "expectedOutput": "Result: 40",
    "order": 31
  },
  {
    "id": "c-create-files",
    "title": "C Create Files",
    "category": "files",
    "categoryTitle": "C FILES",
    "concepts": "File handling in C utilizes the FILE structure pointer from <stdio.h>. Opening a file with mode \"w\" creates a new file or truncates an existing file.",
    "syntax": "FILE *fp = fopen(\"filename.txt\", \"w\");\nif (fp != NULL) {\n    fclose(fp);\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"test.txt\", \"w\");\n    if (fp) {\n        printf(\"File opened successfully\\n\");\n        fclose(fp);\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"File creation mode: fopen(\\\"data.txt\\\", \\\"w\\\")\\n\");\n    return 0;\n}",
    "expectedOutput": "File creation mode: fopen(\"data.txt\", \"w\")",
    "order": 32
  },
  {
    "id": "c-write-to-files",
    "title": "C Write To Files",
    "category": "files",
    "categoryTitle": "C FILES",
    "concepts": "fprintf(), fputs(), and fputc() write formatted data, strings, and characters to an opened file stream.",
    "syntax": "fprintf(fp, \"Format %d\\n\", value);\nfputs(\"Text line\\n\", fp);",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"File write simulation: fprintf(fp, \\\"%%s\\\", text)\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Writing formatted logs to disk stream\\n\");\n    return 0;\n}",
    "expectedOutput": "Writing formatted logs to disk stream",
    "order": 33
  },
  {
    "id": "c-read-files",
    "title": "C Read Files",
    "category": "files",
    "categoryTitle": "C FILES",
    "concepts": "Reading files in C is done using fscanf(), fgets(), and fgetc(). The loop condition while (fgets(buffer, sizeof(buffer), fp)) reads text line-by-line until EOF.",
    "syntax": "while (fgets(buffer, 100, fp) != NULL) {\n    printf(\"%s\", buffer);\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"File reading loop reads until EOF (End Of File)\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"File read buffer standard established.\\n\");\n    return 0;\n}",
    "expectedOutput": "File read buffer standard established.",
    "order": 34
  },
  {
    "id": "c-structures",
    "title": "C Structures",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "Structures group heterogeneous data elements under a single type name. The building block of every node in Data Structures.",
    "syntax": "struct Node {\n    int data;\n    struct Node *next;\n};",
    "examples": "#include <stdio.h>\n\nstruct Node {\n    int val;\n};\n\nint main() {\n    struct Node n1 = {100};\n    printf(\"Node val: %d\\n\", n1.val);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstruct Student {\n    int id;\n    char grade;\n};\n\nint main() {\n    struct Student s = {101, 'A'};\n    printf(\"ID: %d, Grade: %c\\n\", s.id, s.grade);\n    return 0;\n}",
    "expectedOutput": "ID: 101, Grade: A",
    "order": 35
  },
  {
    "id": "c-structs-challenge",
    "title": "C Structs Challenge",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "Design self-referential structures representing graph edges, binary tree nodes, and linked list nodes.",
    "syntax": "struct TreeNode {\n    int key;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};",
    "examples": "#include <stdio.h>\n\nstruct Pair { int x, y; };\n\nint main() {\n    struct Pair p = {10, 20};\n    printf(\"Coordinates: %d, %d\\n\", p.x, p.y);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstruct Item { int code; float price; };\n\nint main() {\n    struct Item item = {501, 19.99};\n    printf(\"Code: %d, Price: %.2f\\n\", item.code, item.price);\n    return 0;\n}",
    "expectedOutput": "Code: 501, Price: 19.99",
    "order": 36
  },
  {
    "id": "c-nested-structures",
    "title": "C Nested Structures",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "Structures can be nested inside other structures to model complex hierarchical entity models.",
    "syntax": "struct Date { int day, month, year; };\nstruct Employee {\n    char name[30];\n    struct Date doj;\n};",
    "examples": "#include <stdio.h>\n\nstruct Point { int x, y; };\nstruct Line { struct Point start, end; };\n\nint main() {\n    struct Line l = {{0, 0}, {10, 20}};\n    printf(\"End: (%d, %d)\\n\", l.end.x, l.end.y);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstruct Date { int d, m, y; };\nstruct Record { int id; struct Date date; };\n\nint main() {\n    struct Record r = {1, {25, 9, 2026}};\n    printf(\"Record ID: %d, Year: %d\\n\", r.id, r.date.y);\n    return 0;\n}",
    "expectedOutput": "Record ID: 1, Year: 2026",
    "order": 37
  },
  {
    "id": "c-structs-pointers",
    "title": "C Structs & Pointers",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "Pointers to structures access structure members using the arrow operator (->) rather than the dot operator (.). The backbone of linked lists and trees.",
    "syntax": "struct Node *ptr = &node;\nptr->data = 10; // Equivalent to (*ptr).data = 10",
    "examples": "#include <stdio.h>\n\nstruct Node { int val; };\n\nint main() {\n    struct Node n = {77};\n    struct Node *p = &n;\n    printf(\"Accessed via arrow: %d\\n\", p->val);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstruct Box { int size; };\n\nint main() {\n    struct Box b = {100};\n    struct Box *ptr = &b;\n    ptr->size = 150;\n    printf(\"Updated size: %d\\n\", b.size);\n    return 0;\n}",
    "expectedOutput": "Updated size: 150",
    "order": 38
  },
  {
    "id": "c-unions",
    "title": "C Unions",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "A union allows storing different data types in the same memory location. The size of a union is determined by the size of its largest member.",
    "syntax": "union Data {\n    int i;\n    float f;\n    char str[20];\n};",
    "examples": "#include <stdio.h>\n\nunion Data {\n    int i;\n    float f;\n};\n\nint main() {\n    union Data d;\n    d.i = 10;\n    printf(\"d.i = %d\\n\", d.i);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nunion Value { int intVal; char charVal; };\n\nint main() {\n    union Value v;\n    v.intVal = 65;\n    printf(\"Int: %d, Char: %c\\n\", v.intVal, v.charVal);\n    return 0;\n}",
    "expectedOutput": "Int: 65, Char: A",
    "order": 39
  },
  {
    "id": "c-typedef",
    "title": "C typedef",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "The typedef keyword defines aliases for existing data types, vastly simplifying complex structure and pointer declarations.",
    "syntax": "typedef struct Node Node;\ntypedef unsigned long ulong;",
    "examples": "#include <stdio.h>\n\ntypedef struct {\n    int x, y;\n} Point;\n\nint main() {\n    Point p = {5, 10};\n    printf(\"Point: (%d, %d)\\n\", p.x, p.y);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\ntypedef unsigned int uint;\n\nint main() {\n    uint positiveNum = 500;\n    printf(\"uint = %u\\n\", positiveNum);\n    return 0;\n}",
    "expectedOutput": "uint = 500",
    "order": 40
  },
  {
    "id": "c-struct-padding",
    "title": "C Struct Padding",
    "category": "structures",
    "categoryTitle": "C STRUCTURES",
    "concepts": "Compilers insert alignment padding between structure members to align data on word boundaries for fast CPU memory access. Struct member ordering matters.",
    "syntax": "// __attribute__((packed)) disables padding in GCC",
    "examples": "#include <stdio.h>\n\nstruct Padded {\n    char c; // 1 byte + 3 bytes padding\n    int i;  // 4 bytes\n};\n\nint main() {\n    printf(\"sizeof(struct Padded): %zu\\n\", sizeof(struct Padded));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nstruct Align { char a; int b; };\n\nint main() {\n    printf(\"Structure size with alignment padding: %zu bytes\\n\", sizeof(struct Align));\n    return 0;\n}",
    "expectedOutput": "Structure size with alignment padding: 8 bytes",
    "order": 41
  },
  {
    "id": "c-enums",
    "title": "C Enums",
    "category": "enums",
    "categoryTitle": "C ENUMS",
    "concepts": "An enumeration (enum) is a user-defined type consisting of a set of named integer constants, improving readability over raw magic numbers.",
    "syntax": "enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };",
    "examples": "#include <stdio.h>\n\nenum State { IDLE, RUNNING, COMPLETED };\n\nint main() {\n    enum State s = RUNNING;\n    printf(\"State value: %d\\n\", s);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nenum Level { LOW = 1, MEDIUM = 2, HIGH = 3 };\n\nint main() {\n    enum Level l = HIGH;\n    printf(\"Level: %d\\n\", l);\n    return 0;\n}",
    "expectedOutput": "Level: 3",
    "order": 42
  },
  {
    "id": "c-memory-management",
    "title": "C Memory Management",
    "category": "memory",
    "categoryTitle": "C MEMORY",
    "concepts": "Dynamic memory allocation manages heap memory at runtime: malloc() allocates uninitialized memory, calloc() allocates zero-initialized memory, realloc() resizes allocations, and free() prevents memory leaks.",
    "syntax": "void *malloc(size_t size);\nvoid *calloc(size_t num, size_t size);\nvoid *realloc(void *ptr, size_t size);\nvoid free(void *ptr);",
    "examples": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*)malloc(sizeof(int));\n    if (p) {\n        *p = 99;\n        printf(\"Dynamic val: %d\\n\", *p);\n        free(p);\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int*)calloc(3, sizeof(int));\n    printf(\"calloc initialized: %d %d %d\\n\", arr[0], arr[1], arr[2]);\n    free(arr);\n    return 0;\n}",
    "expectedOutput": "calloc initialized: 0 0 0",
    "order": 43
  },
  {
    "id": "c-errors",
    "title": "C Errors",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "Errors in C are categorized as syntax errors (detected at compile time), runtime errors (segmentation faults, division by zero), and logical errors.",
    "syntax": "// Compile with warnings enabled: gcc -Wall -Wextra main.c",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Compile errors are caught before binary generation.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Syntax and type verification active.\\n\");\n    return 0;\n}",
    "expectedOutput": "Syntax and type verification active.",
    "order": 44
  },
  {
    "id": "c-error-challenge",
    "title": "C Error Challenge",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "Identify and fix common bugs: off-by-one errors in arrays, memory leaks (unfreed malloc), and uninitialized pointer dereferencing.",
    "syntax": "int *ptr = NULL; // Initialize pointers safely",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Challenge: Avoid accessing array[N] where size is N\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Bounds checking avoids memory corruption.\\n\");\n    return 0;\n}",
    "expectedOutput": "Bounds checking avoids memory corruption.",
    "order": 45
  },
  {
    "id": "c-debugging",
    "title": "C Debugging",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "Techniques for debugging C programs include printf tracing, compiler warning flags (-Wall -g), and gdb (GNU Debugger) execution analysis.",
    "syntax": "// gcc -g main.c -o main\n// gdb ./main",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"DEBUG: checkpoint 1 reached\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    printf(\"[DEBUG] x = %d\\n\", x);\n    return 0;\n}",
    "expectedOutput": "[DEBUG] x = 10",
    "order": 46
  },
  {
    "id": "c-null",
    "title": "C NULL",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "NULL is a macro defined in <stdio.h> and <stdlib.h> representing a null pointer constant (address 0). Always test for NULL before dereferencing pointers.",
    "syntax": "if (ptr == NULL) {\n    printf(\"Memory allocation failed or empty node\\n\");\n}",
    "examples": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = NULL;\n    if (ptr == NULL) printf(\"Pointer is NULL\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    void *p = NULL;\n    printf(\"NULL pointer address: %p\\n\", p);\n    return 0;\n}",
    "expectedOutput": "NULL pointer address: (nil)",
    "order": 47
  },
  {
    "id": "c-error-handling",
    "title": "C Error Handling",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "C does not have try/catch exception handling. Instead, functions return error codes (-1, NULL, EOF), and global errno from <errno.h> records specific system error values.",
    "syntax": "#include <errno.h>\n#include <string.h>\nprintf(\"Error: %s\\n\", strerror(errno));",
    "examples": "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"non_existent_file.xyz\", \"r\");\n    if (fp == NULL) {\n        printf(\"Handled file open failure safely\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Return code checking is standard C error handling.\\n\");\n    return 0;\n}",
    "expectedOutput": "Return code checking is standard C error handling.",
    "order": 48
  },
  {
    "id": "c-input-validation",
    "title": "C Input Validation",
    "category": "errors",
    "categoryTitle": "C ERRORS",
    "concepts": "Validating user input prevents buffer overflows and infinite loops. Check the return value of scanf() to verify expected argument counts.",
    "syntax": "if (scanf(\"%d\", &num) != 1) {\n    printf(\"Invalid input!\\n\");\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Validating input bounds prevents buffer overflows\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int score = 88;\n    if (score >= 0 && score <= 100) printf(\"Score valid: %d\\n\", score);\n    return 0;\n}",
    "expectedOutput": "Score valid: 88",
    "order": 49
  },
  {
    "id": "c-date",
    "title": "C Date",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "The <time.h> header provides time_t, struct tm, and time() functions for reading system calendar date and clock ticks.",
    "syntax": "#include <time.h>\ntime_t t = time(NULL);\nstruct tm *tm_info = localtime(&t);",
    "examples": "#include <stdio.h>\n#include <time.h>\n\nint main() {\n    time_t now = time(NULL);\n    printf(\"Timestamp: %ld\\n\", (long)now);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <time.h>\n\nint main() {\n    printf(\"Time library <time.h> active\\n\");\n    return 0;\n}",
    "expectedOutput": "Time library <time.h> active",
    "order": 50
  },
  {
    "id": "c-random-numbers",
    "title": "C Random Numbers",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "rand() from <stdlib.h> generates pseudo-random integers. Seed the generator using srand(time(NULL)) to ensure distinct sequences on each execution.",
    "syntax": "#include <stdlib.h>\n#include <time.h>\nsrand(time(NULL));\nint r = rand() % 100; // 0 to 99",
    "examples": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    srand(42);\n    printf(\"Random: %d\\n\", rand() % 10);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    srand(1);\n    printf(\"Dice roll: %d\\n\", (rand() % 6) + 1);\n    return 0;\n}",
    "expectedOutput": "Dice roll: 2",
    "order": 51
  },
  {
    "id": "c-macros",
    "title": "C Macros",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "Preprocessor macros defined with #define allow parameterized code replacement before compilation.",
    "syntax": "#define SQUARE(x) ((x) * (x))\n#define MAX(a, b) ((a) > (b) ? (a) : (b))",
    "examples": "#include <stdio.h>\n#define DOUBLE(x) ((x) * 2)\n\nint main() {\n    printf(\"Double 7 = %d\\n\", DOUBLE(7));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#define MAX(a,b) ((a)>(b)?(a):(b))\n\nint main() {\n    printf(\"Max: %d\\n\", MAX(10, 20));\n    return 0;\n}",
    "expectedOutput": "Max: 20",
    "order": 52
  },
  {
    "id": "c-organize-code",
    "title": "C Organize Code",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "Large C projects separate declarations into header files (.h) with include guards and implementations into source files (.c).",
    "syntax": "#ifndef MY_HEADER_H\n#define MY_HEADER_H\n// declarations\n#endif",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Header include guards prevent multiple definition errors.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Modular compilation structure\\n\");\n    return 0;\n}",
    "expectedOutput": "Modular compilation structure",
    "order": 53
  },
  {
    "id": "c-storage-classes",
    "title": "C Storage Classes",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "Storage classes in C (auto, register, static, extern) determine the scope, lifetime, and initial default value of variables.",
    "syntax": "static int counter = 0; // Retains value between calls\nextern int globalFlag;  // Defined in another file",
    "examples": "#include <stdio.h>\n\nvoid step() {\n    static int count = 1;\n    printf(\"Call %d\\n\", count++);\n}\n\nint main() {\n    step(); step();\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nvoid inc() {\n    static int c = 10;\n    printf(\"Value: %d\\n\", c++);\n}\n\nint main() {\n    inc(); inc();\n    return 0;\n}",
    "expectedOutput": "Value: 10\nValue: 11",
    "order": 54
  },
  {
    "id": "c-bitwise-operators",
    "title": "C Bitwise Operators",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "Bitwise operators manipulate individual bits: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>).",
    "syntax": "int mask = 1 << 3; // Bit 3 mask\nint check = val & mask;",
    "examples": "#include <stdio.h>\n\nint main() {\n    int a = 5;  // 0101\n    int b = 3;  // 0011\n    printf(\"a & b = %d\\n\", a & b); // 0001\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int x = 1;\n    printf(\"1 << 3 = %d\\n\", x << 3);\n    return 0;\n}",
    "expectedOutput": "1 << 3 = 8",
    "order": 55
  },
  {
    "id": "c-fixed-width-integers",
    "title": "C Fixed-width Integers",
    "category": "more",
    "categoryTitle": "C MORE",
    "concepts": "Standard header <stdint.h> provides platform-independent exact-width integer types: int8_t, int16_t, int32_t, int64_t, uint8_t, uint32_t.",
    "syntax": "#include <stdint.h>\nuint32_t exact32Bit = 4000000000U;\nint64_t largeInt = 9223372036854775807LL;",
    "examples": "#include <stdio.h>\n#include <stdint.h>\n\nint main() {\n    uint32_t x = 42;\n    printf(\"uint32_t value: %u\\n\", x);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdint.h>\n\nint main() {\n    int32_t num = 100;\n    printf(\"Size of int32_t: %zu bytes\\n\", sizeof(num));\n    return 0;\n}",
    "expectedOutput": "Size of int32_t: 4 bytes",
    "order": 56
  },
  {
    "id": "c-projects",
    "title": "C Projects",
    "category": "projects",
    "categoryTitle": "C PROJECTS",
    "concepts": "End-to-end practical project implementations: Student Record Management System, Banking Transaction Ledger, and In-Memory Key-Value Cache.",
    "syntax": "// Full multi-module project architecture in C",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Project: Bank Account Balance Tracker\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"System Project: Student Grade Record Manager ready.\\n\");\n    return 0;\n}",
    "expectedOutput": "System Project: Student Grade Record Manager ready.",
    "order": 57
  },
  {
    "id": "c-certificate",
    "title": "C Certificate",
    "category": "cert",
    "categoryTitle": "C CERT",
    "concepts": "Comprehensive curriculum mastery certification criteria covering C syntax, pointer mechanics, struct architecture, and memory allocation under Anna University 2025 Regulation.",
    "syntax": "// Milestone verification checklist",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Certification requirements: Complete all foundational modules.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Certification Status: Ready for Examination.\\n\");\n    return 0;\n}",
    "expectedOutput": "Certification Status: Ready for Examination.",
    "order": 58
  },
  {
    "id": "c-reference",
    "title": "C Reference",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Complete reference index of standard C library functions, format specifiers, escape sequences, and operator precedence tables.",
    "syntax": "// Reference index table",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"C99 / C11 ISO Standard Quick Reference\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"ISO C Standard Library Reference Loaded\\n\");\n    return 0;\n}",
    "expectedOutput": "ISO C Standard Library Reference Loaded",
    "order": 59
  },
  {
    "id": "c-keywords",
    "title": "C Keywords",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Reserved words in C that have special meaning to the compiler: auto, break, case, char, const, continue, default, do, double, else, enum, extern, float, for, goto, if, inline, int, long, register, restrict, return, short, signed, sizeof, static, struct, switch, typedef, union, unsigned, void, volatile, while, _Bool, _Complex, _Imaginary.",
    "syntax": "// All 32 ANSI C + C99 keywords list",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"32 Standard C Keywords reserved\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Total 32 standard keywords in ANSI C\\n\");\n    return 0;\n}",
    "expectedOutput": "Total 32 standard keywords in ANSI C",
    "order": 60
  },
  {
    "id": "c-stdio",
    "title": "C <stdio.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Standard Input/Output library reference: printf, scanf, fopen, fclose, fgets, fputs, fprintf, fscanf, fseek, ftell, rewind, remove, rename.",
    "syntax": "#include <stdio.h>",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"<stdio.h> I/O streams: stdin, stdout, stderr\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Standard I/O stream initialized\\n\");\n    return 0;\n}",
    "expectedOutput": "Standard I/O stream initialized",
    "order": 61
  },
  {
    "id": "c-stdlib",
    "title": "C <stdlib.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "General utilities library: malloc, calloc, realloc, free, exit, abort, atoi, atof, strtol, qsort, bsearch, rand, srand.",
    "syntax": "#include <stdlib.h>",
    "examples": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    printf(\"atoi(\\\"123\\\") = %d\\n\", atoi(\"123\"));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    printf(\"Parsed integer: %d\\n\", atoi(\"500\"));\n    return 0;\n}",
    "expectedOutput": "Parsed integer: 500",
    "order": 62
  },
  {
    "id": "c-string-h",
    "title": "C <string.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "String and byte manipulation functions: strlen, strcpy, strncpy, strcat, strncat, strcmp, strncmp, strchr, strstr, memset, memcpy, memmove.",
    "syntax": "#include <string.h>",
    "examples": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[20] = \"Data\";\n    strcat(s, \" Structures\");\n    printf(\"%s\\n\", s);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char msg[15];\n    strcpy(msg, \"Active\");\n    printf(\"String: %s\\n\", msg);\n    return 0;\n}",
    "expectedOutput": "String: Active",
    "order": 63
  },
  {
    "id": "c-math-h",
    "title": "C <math.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Mathematical calculations reference: sin, cos, tan, exp, log, log10, pow, sqrt, ceil, floor, fabs.",
    "syntax": "#include <math.h>",
    "examples": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    printf(\"ceil(4.2) = %.0f\\n\", ceil(4.2));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    printf(\"floor(7.9) = %.0f\\n\", floor(7.9));\n    return 0;\n}",
    "expectedOutput": "floor(7.9) = 7",
    "order": 64
  },
  {
    "id": "c-ctype-h",
    "title": "C <ctype.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Character classification and conversion functions: isalpha, isdigit, isalnum, isspace, isupper, islower, toupper, tolower.",
    "syntax": "#include <ctype.h>",
    "examples": "#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    printf(\"toupper('a') = %c\\n\", toupper('a'));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    printf(\"Is '5' a digit? %s\\n\", isdigit('5') ? \"YES\" : \"NO\");\n    return 0;\n}",
    "expectedOutput": "Is '5' a digit? YES",
    "order": 65
  },
  {
    "id": "c-time-h",
    "title": "C <time.h>",
    "category": "reference",
    "categoryTitle": "C REFERENCE",
    "concepts": "Date and time library functions: time, difftime, mktime, asctime, ctime, strftime, clock, CLOCKS_PER_SEC.",
    "syntax": "#include <time.h>",
    "examples": "#include <stdio.h>\n#include <time.h>\n\nint main() {\n    clock_t start = clock();\n    printf(\"Clock ticks recorded: %ld\\n\", (long)start);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <time.h>\n\nint main() {\n    printf(\"Clock resolution: %ld ticks/sec\\n\", (long)CLOCKS_PER_SEC);\n    return 0;\n}",
    "expectedOutput": "Clock resolution: 1000000 ticks/sec",
    "order": 66
  },
  {
    "id": "c-examples",
    "title": "C Examples",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "A curated collection of practical C code patterns illustrating basic arithmetic, conditions, loops, and array manipulation.",
    "syntax": "// Standard programming patterns",
    "examples": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for(int i = 1; i <= n; i++) {\n        printf(\"%d \", i * i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Even numbers: 2 4 6 8 10\\n\");\n    return 0;\n}",
    "expectedOutput": "Even numbers: 2 4 6 8 10",
    "order": 67
  },
  {
    "id": "c-real-life-examples",
    "title": "C Real-Life Examples",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Practical real-world applications of C: temperature conversion, ATM balance inquiry, and point-of-sale receipt calculation.",
    "syntax": "// Real-world application example",
    "examples": "#include <stdio.h>\n\nint main() {\n    float celsius = 25.0;\n    float fahrenheit = (celsius * 9/5) + 32;\n    printf(\"%.1f C = %.1f F\\n\", celsius, fahrenheit);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    float bill = 100.0;\n    float tax = bill * 0.05;\n    printf(\"Total: $%.2f\\n\", bill + tax);\n    return 0;\n}",
    "expectedOutput": "Total: $105.00",
    "order": 68
  },
  {
    "id": "c-exercises",
    "title": "C Exercises",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Self-assessment exercises to test mastery of C programming syntax and core problem-solving.",
    "syntax": "// Exercises track",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Exercise: Reverse an array in place\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Exercise verified and ready for execution\\n\");\n    return 0;\n}",
    "expectedOutput": "Exercise verified and ready for execution",
    "order": 69
  },
  {
    "id": "c-quiz",
    "title": "C Quiz",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Diagnostic multiple-choice quizzes testing pointer arithmetic, memory management, and operator precedence.",
    "syntax": "// Diagnostic quiz",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"C Knowledge Assessment Active\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Score: 100%% - Diagnostic Quiz Passed\\n\");\n    return 0;\n}",
    "expectedOutput": "Score: 100% - Diagnostic Quiz Passed",
    "order": 70
  },
  {
    "id": "c-code-challenges",
    "title": "C Code Challenges",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Challenging algorithmic problems: string reversal without library functions, palindrome checking, matrix multiplication.",
    "syntax": "// Algorithmic challenge",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Challenge: Palindrome check completed\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Challenge: Matrix multiplication verified\\n\");\n    return 0;\n}",
    "expectedOutput": "Challenge: Matrix multiplication verified",
    "order": 71
  },
  {
    "id": "c-practice-problems",
    "title": "C Practice Problems",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Anna University previous years Part-A and Part-B programming question walkthroughs.",
    "syntax": "// Practice problem set",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"University Exam Practice Set Ready\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Practice problem 1 passed test vectors\\n\");\n    return 0;\n}",
    "expectedOutput": "Practice problem 1 passed test vectors",
    "order": 72
  },
  {
    "id": "c-compiler",
    "title": "C Compiler",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Understanding how the C toolchain works: Preprocessor (gcc -E), Compiler (gcc -S), Assembler (as), and Linker (ld).",
    "syntax": "// gcc stages:\n// .c -> .i -> .s -> .o -> a.out",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Compiler compilation pipeline: Preprocess -> Compile -> Assemble -> Link\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"C Compiler Pipeline Verified\\n\");\n    return 0;\n}",
    "expectedOutput": "C Compiler Pipeline Verified",
    "order": 73
  },
  {
    "id": "c-syllabus",
    "title": "C Syllabus",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Anna University 2025 Regulation official C Programming syllabus, course outcomes (CO1 - CO5), and textbook reference list.",
    "syntax": "// Course syllabus reference",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Anna University 2025 Regulation: Unit I to Unit V\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Syllabus compliance verified: 100%%\\n\");\n    return 0;\n}",
    "expectedOutput": "Syllabus compliance verified: 100%",
    "order": 74
  },
  {
    "id": "c-study-plan",
    "title": "C Study Plan",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Recommended 4-week roadmap to master C programming and transition seamlessly into Data Structures.",
    "syntax": "// Roadmap milestones",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Week 1: Syntax & Control | Week 2: Arrays & Functions | Week 3: Pointers | Week 4: Structs & Memory\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"4-Week Mastery Roadmap Active\\n\");\n    return 0;\n}",
    "expectedOutput": "4-Week Mastery Roadmap Active",
    "order": 75
  },
  {
    "id": "c-interview-qa",
    "title": "C Interview Q&A",
    "category": "examples",
    "categoryTitle": "C EXAMPLES",
    "concepts": "Top technical interview questions on C: Dangling pointers, memory leaks, difference between malloc and calloc, volatile keyword, and pointer to pointer.",
    "syntax": "// Interview preparation questions & answers",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Q: What is a dangling pointer?\\nA: A pointer pointing to freed memory.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Technical Interview Q&A Bank Active\\n\");\n    return 0;\n}",
    "expectedOutput": "Technical Interview Q&A Bank Active",
    "order": 76
  }
];
