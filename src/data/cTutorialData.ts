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
    "concepts": "### Learn C Programming\nC is a foundational, general-purpose language created by Dennis Ritchie at Bell Labs (1972) to develop UNIX. It provides direct memory control and extreme execution efficiency.\n\n### Why Learn C?\n1. **Universal Foundation**: Syntax basis for languages like C++, Python, and JavaScript.\n2. **High Performance**: Fast, compiled machine code without runtime overhead.\n3. **Direct Memory Access**: Essential for Data Structures, operating systems, and embedded computing.\n4. **C vs C++**: C is procedural (functions & memory); C++ extends C with Object-Oriented features.\n\n### Interactive GCC Sandbox\nTest and run programs instantly with our built-in browser-based GCC compiler!",
    "syntax": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\\n\");\n    return 0;\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Welcome to C Programming on our Learning Platform\n    printf(\"Hello World!\\n\");\n    printf(\"Welcome to C Programming!\\n\");\n    printf(\"Learn C step-by-step with interactive examples.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\\n\");\n    return 0;\n}",
    "expectedOutput": "Hello World!",
    "exercise": {
      "question": "Insert the missing part of the code below to output 'Hello World!':\n\nint main() {\n  ______(\"Hello World!\");\n  return 0;\n}",
      "starterCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\\n\");\n    return 0;\n}",
      "solution": "printf",
      "hint": "The printf() function outputs text to standard output (stdout)."
    },
    "order": 1
  },
  {
    "id": "c-intro",
    "title": "C Intro",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### What is C?\nC is a general-purpose programming language developed by Dennis Ritchie at Bell Laboratories in 1972.\n\nDespite its age, C remains extremely popular and essential. The primary reason is that C provides direct access to machine memory, low overhead, and deterministic execution speed.\n\n### Why Learn C?\n\u2022 **Foundational Knowledge**: Understanding how memory, pointers, and variables work in C builds a solid mental model for algorithms and Data Structures.\n\u2022 **High Performance**: C compiles directly into native machine instructions without garbage collection pauses or runtime bloat.\n\u2022 **Ubiquity**: Operating systems (Linux kernel, Windows core, macOS Darwin), high-performance game engines, embedded microcontrollers, and database engines (PostgreSQL, SQLite) are written in C.\n\n### C vs C++ Comparison\n| Feature | C | C++ |\n|---|---|---|\n| Paradigm | Procedural Programming | Multi-paradigm (Procedural + OOP) |\n| Classes & Objects | Not supported | Fully supported |\n| Memory Model | Manual (`malloc`/`free`) | Manual (`new`/`delete`) + RAII |\n| Use Cases | Embedded, OS kernels, Drivers | Large applications, Game engines, GUI |",
    "syntax": "/* Standard C Program Skeleton */\n#include <stdio.h>   // Preprocessor directive for Standard I/O\n\nint main(void) {     // Program entry point\n    // Statements execute sequentially\n    return 0;        // 0 indicates successful termination\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int releaseYear = 1972;\n    char developer[] = \"Dennis Ritchie\";\n    printf(\"C was created in %d by %s at Bell Labs.\\n\", releaseYear, developer);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"C provides direct memory manipulation through pointers.\\n\");\n    return 0;\n}",
    "expectedOutput": "C provides direct memory manipulation through pointers.",
    "exercise": {
      "question": "Which header file is required to use printf() and scanf() in standard C?",
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
    "concepts": "### C Get Started\nTo start using C on your computer, you need two tools:\n1. A text editor to write C code (such as VS Code, CLion, or Notepad)\n2. A C compiler (such as GCC or Clang) to translate your human-readable C code into executable machine code.\n\nOn this learning platform, you don't need to install or configure anything! An interactive GCC WebAssembly compiler sandbox is built directly into every chapter.\n\n### Your First C File (`myfirstprogram.c`)\n```c\n#include <stdio.h>\n\nint main() {\n  printf(\"Hello World!\\n\");\n  return 0;\n}\n```\n\n### Compiling and Running in Terminal\nIf compiling manually in Linux, macOS, or Windows WSL:\n```bash\n# 1. Compile the source file into an executable named 'myfirstprogram'\ngcc myfirstprogram.c -o myfirstprogram\n\n# 2. Run the compiled executable binary\n./myfirstprogram\n```",
    "syntax": "// Standard GCC command syntax:\n// gcc [options] [source_file.c] -o [output_binary]\n// Example: gcc -Wall -O2 main.c -o main && ./main",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Ready to write and compile C programs!\\n\");\n    printf(\"Compiler: GCC 14.2 Standard C99/C11\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Environment initialized and ready for compilation.\\n\");\n    return 0;\n}",
    "expectedOutput": "Environment initialized and ready for compilation.",
    "exercise": {
      "question": "What flag is used in gcc to specify the name of the generated executable binary?",
      "starterCode": "-o",
      "solution": "-o (e.g., gcc main.c -o myprog)",
      "hint": "Short for output."
    },
    "order": 3
  },
  {
    "id": "c-syntax",
    "title": "C Syntax",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Syntax Breakdown\nLet's examine the code from `myfirstprogram.c` line by line:\n\n\u2022 **Line 1: `#include <stdio.h>`**\nThis is a header file library that lets us work with input and output functions, such as `printf()` (used on line 4). Header files add external functions to C programs.\n\n\u2022 **Line 2: Blank line**\nC ignores whitespace. We use blank lines and indentation to make code readable and maintainable.\n\n\u2022 **Line 3: `int main()`**\nThis is a function. Any code inside its curly brackets `{}` will be executed. Every C program must have one (and only one) `main()` function.\n\n\u2022 **Line 4: `printf(\"Hello World!\");`**\n`printf()` is a function used to output/print text to the screen. In our example, it will output \"Hello World!\".\n*Crucial Rule:* Every C statement must terminate with a semicolon (`;`).\n\n\u2022 **Line 5: `return 0;`**\n`return 0` ends the `main()` function and signals a clean exit to the operating system.\n\n\u2022 **Line 6: `}`**\nClosing curly bracket that marks the end of the `main()` function body.",
    "syntax": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\");\n    return 0;\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int sum = a + b;\n    printf(\"Sum of %d and %d is: %d\\n\", a, b, sum);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf(\"x = %d\\n\", x);\n    return 0;\n}",
    "expectedOutput": "x = 5",
    "exercise": {
      "question": "What character must be placed at the end of every statement in C?",
      "starterCode": ";",
      "solution": "; (semicolon)",
      "hint": "Omitting this symbol causes a syntax error before the next statement."
    },
    "order": 4
  },
  {
    "id": "c-output",
    "title": "C Output (Print Text)",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Output (Print Text)\nTo output values or print text in C, you can use the `printf()` function.\n\n### Double Quotes\nWhen you are working with text, it must be wrapped inside double quotation marks `\"\"`.\nIf you forget the double quotes, an error occurs: `printf(\"Hello World!\");`.\n\n### Multiple printf Statements\nYou can use as many `printf()` functions as you want. However, note that it does not insert a new line at the end of the output by default:\n```c\nprintf(\"Hello World!\");\nprintf(\"I am learning C.\");\n// Outputs: Hello World!I am learning C.\n```\n\n### New Lines (`\\n`)\nTo insert a new line, you use the `\\n` character sequence:\n```c\nprintf(\"Hello World!\\n\");\nprintf(\"I am learning C.\\n\");\n```\nTwo `\\n` characters after each other will create an empty blank line!\n\n### Useful Escape Characters\nThe newline character (`\\n`) is called an **escape sequence**, and it forces the cursor to change its position to the beginning of the next line on the screen.\nOther common escape characters in C:\n\u2022 `\\t` : Creates a horizontal tab (indentation)\n\u2022 `\\\\` : Inserts a single backslash character (`\\`)\n\u2022 `\\\"` : Inserts a double quote character (`\"`)\n\u2022 `\\'` : Inserts a single quote character (`'`)\n\u2022 `\\0` : Inserts the null character (marks end of strings)",
    "syntax": "printf(\"Hello World!\\n\");\nprintf(\"Tabbed:\\tFirst\\tSecond\\n\");\nprintf(\"Quoted: \\\"C Language\\\" and Path: C:\\\\ProgramFiles\\n\");",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\\n\");\n    printf(\"I am learning C Programming.\\nAnd it is awesome!\\n\\n\");\n    printf(\"Escape Sequences Demo:\\n\");\n    printf(\"\\t\u2022 Tabbed item 1\\n\");\n    printf(\"\\t\u2022 Tabbed item 2\\n\");\n    printf(\"Displaying double quotes: \\\"C Programming\\\"\\n\");\n    printf(\"Displaying backslash: C:\\\\dev\\\\workspace\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\\n\");\n    printf(\"I am learning C.\\n\");\n    printf(\"Having fun with C!\\tTabs work too.\\n\");\n    return 0;\n}",
    "expectedOutput": "Hello World!\nI am learning C.\nHaving fun with C!\tTabs work too.",
    "exercise": {
      "question": "Which escape sequence character in C is used to insert a new line?",
      "starterCode": "\\n",
      "solution": "\\n",
      "hint": "A backslash followed by the letter n."
    },
    "order": 5
  },
  {
    "id": "c-comments",
    "title": "C Comments",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Comments\nComments can be used to explain C code, and to make it more readable. They can also be used to prevent code execution when testing alternative code or debugging.\nComments can be **single-line** or **multi-line**.\n\n### Single-line Comments\nSingle-line comments start with two forward slashes (`//`).\nAny text between `//` and the end of the line is completely ignored by the compiler:\n```c\n// This is a standalone single-line comment\nprintf(\"Hello World!\");\nprintf(\"Hello World!\"); // This is an inline comment at the end of a line\n```\n\n### Multi-line Comments\nMulti-line comments start with `/*` and end with `*/`.\nAny text between `/*` and `*/` will be ignored by the compiler:\n```c\n/* The code below will print the words Hello World!\nto the screen, and it is amazing */\nprintf(\"Hello World!\");\n```\n\n### Single or Multi-line Comments?\nIt is up to you which you want to use. Normally, we use `//` for short notes and inline remarks, and `/* */` for multi-line documentation or commenting out blocks of test code.\nComments are stripped during the preprocessor phase and never add to the compiled binary size or runtime overhead!",
    "syntax": "// Single-line comment: explains the next line\n\n/*\n   Multi-line comment:\n   Can span as many lines\n   as you need for detailed explanations\n*/",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Single-line comment: greet the learner\n    printf(\"Hello World!\\n\");\n\n    /* Multi-line comment:\n       The variable below represents the vehicle speed limit\n       enforced in urban school zones. */\n    int speedLimit = 40; // Speed in km/h\n    printf(\"Current speed limit: %d km/h\\n\", speedLimit);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    // This line explains the greeting\n    printf(\"Comments are ignored by the compiler!\\n\");\n    return 0;\n}",
    "expectedOutput": "Comments are ignored by the compiler!",
    "exercise": {
      "question": "How do you start a single-line comment in C?",
      "starterCode": "//",
      "solution": "//",
      "hint": "Two forward slashes."
    },
    "order": 6
  },
  {
    "id": "c-variables",
    "title": "C Variables & Format Specifiers",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Variables\nVariables are containers for storing data values, like numbers and characters.\nIn C, there are different **types** of variables (defined with different keywords):\n\u2022 `int` - stores integers (whole numbers), without decimals, such as `123` or `-123`\n\u2022 `float` - stores floating point numbers, with decimals, such as `19.99` or `-19.99`\n\u2022 `char` - stores single characters, such as `'a'` or `'B'`. Characters are surrounded by single quotes.\n\n### Declaring (Creating) Variables\nTo create a variable, specify the type and assign it a value:\n```c\ntype variableName = value;\n```\n\n### Format Specifiers\nFormat specifiers are used together with the `printf()` function to tell the compiler what type of data the variable is storing. You are essentially creating placeholders for variable values.\n\u2022 `%d` or `%i` : Integer (whole number)\n\u2022 `%f` : Float (floating point number)\n\u2022 `%lf` : Double (double precision float)\n\u2022 `%c` : Character\n\u2022 `%s` : String (text)\n\n### Change Variable Values\nIf you assign a new value to an existing variable, it will overwrite the previous value.\n\n### Real-Life Example: Calculate the Area of a Rectangle\n```c\nint length = 4;\nint width = 6;\nint area = length * width;\nprintf(\"Area: %d\\n\", area);\n```",
    "syntax": "int myNum = 15;            // Integer\nfloat myFloatNum = 5.99;   // Floating point number\nchar myLetter = 'D';       // Character\n\n// Print variables with format specifiers:\nprintf(\"%d\\n\", myNum);\nprintf(\"%f\\n\", myFloatNum);\nprintf(\"%c\\n\", myLetter);",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Student data variables (Real-Life example)\n    int studentID = 15;\n    int studentAge = 23;\n    float studentFee = 75.25;\n    char studentGrade = 'B';\n\n    // Print variables using format specifiers\n    printf(\"Student ID: %d\\n\", studentID);\n    printf(\"Student Age: %d\\n\", studentAge);\n    printf(\"Student Fee: $%.2f\\n\", studentFee);\n    printf(\"Student Grade: %c\\n\", studentGrade);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    // Create variables\n    int length = 4;\n    int width = 6;\n    int area;\n\n    // Calculate the area of a rectangle\n    area = length * width;\n\n    // Print the variables\n    printf(\"Length is: %d\\n\", length);\n    printf(\"Width is: %d\\n\", width);\n    printf(\"Area of the rectangle is: %d\\n\", area);\n    return 0;\n}",
    "expectedOutput": "Length is: 4\nWidth is: 6\nArea of the rectangle is: 24",
    "exercise": {
      "question": "Which format specifier is used to print a float with printf in C?",
      "starterCode": "%f",
      "solution": "%f",
      "hint": "Starts with % followed by the letter f."
    },
    "order": 7
  },
  {
    "id": "c-data-types",
    "title": "C Data Types & Memory Size",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Data Types\nA data type specifies the size and type of information the variable will store.\nHere are the most common basic data types in C:\n\n| Data Type | Size | Description | Example |\n|---|---|---|---|\n| `int` | 2 or 4 bytes | Stores whole numbers | `1`, `500` |\n| `float` | 4 bytes | Fractional numbers (6-7 decimal digits) | `3.14f` |\n| `double` | 8 bytes | Fractional numbers (15 decimal digits) | `19.99` |\n| `char` | 1 byte | Single character / ASCII code | `'A'`, `'z'` |\n\n### Decimal Precision\nWhen you print floating point numbers, C defaults to 6 digits after the decimal point. You can specify precision with a dot `.` followed by the number of decimals:\n\u2022 `printf(\"%.1f\", myFloat);` -> 1 decimal digit (`3.1`)\n\u2022 `printf(\"%.2f\", myFloat);` -> 2 decimal digits (`3.14`)\n\u2022 `printf(\"%.4f\", myFloat);` -> 4 decimal digits (`3.1416`)\n\n### The Memory Size (`sizeof` Operator)\nThe memory size refers to how much space a type occupies in the computer's memory. To find the size (in bytes) of a data type or variable, use the `sizeof` operator:\n```c\nprintf(\"%zu\\n\", sizeof(int));\n```",
    "syntax": "int myNum = 1000;\nfloat myFloat = 5.75f;\ndouble myDouble = 19.99;\nchar myGrade = 'A';\n\nprintf(\"Size of int: %zu bytes\\n\", sizeof(int));",
    "examples": "#include <stdio.h>\n\nint main() {\n    int myInt = 1000;\n    float myFloat = 5.75;\n    double myDouble = 19.99;\n    char myLetter = 'B';\n\n    printf(\"myInt = %d (size: %zu bytes)\\n\", myInt, sizeof(myInt));\n    printf(\"myFloat = %.2f (size: %zu bytes)\\n\", myFloat, sizeof(myFloat));\n    printf(\"myDouble = %.4lf (size: %zu bytes)\\n\", myDouble, sizeof(myDouble));\n    printf(\"myLetter = %c (size: %zu byte)\\n\", myLetter, sizeof(myLetter));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    float myScore = 95.7523;\n    printf(\"Default float: %f\\n\", myScore);\n    printf(\"Two decimals: %.2f\\n\", myScore);\n    printf(\"One decimal: %.1f\\n\", myScore);\n    return 0;\n}",
    "expectedOutput": "Default float: 95.752300\nTwo decimals: 95.75\nOne decimal: 95.8",
    "exercise": {
      "question": "Which operator is used in C to get the size in bytes of a data type or variable?",
      "starterCode": "sizeof",
      "solution": "sizeof",
      "hint": "A built-in operator keyword starting with size."
    },
    "order": 8
  },
  {
    "id": "c-type-conversion",
    "title": "C Type Conversion",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Type Conversion\nSometimes, you have to convert the value of one data type to another type. This is known as **type conversion**.\nThere are two types of conversion in C:\n\n### 1. Implicit Conversion (Automatically)\nImplicit conversion is done automatically by the compiler when you assign a value of one type to another:\n```c\n// Automatic conversion: int to float\nfloat myFloat = 9;\nprintf(\"%f\", myFloat); // 9.000000\n\n// Automatic conversion: float to int (truncates fractional digits)\nint myInt = 9.99;\nprintf(\"%d\", myInt); // 9\n```\n\n### 2. Explicit Conversion (Manually)\nExplicit conversion is done manually by placing the type in parentheses `()` in front of the value:\n```c\n// Manual conversion: int to float\nfloat sum = (float) 5 / 2;\nprintf(\"%f\", sum); // 2.500000\n```\n*Note:* If you did not cast `(float) 5 / 2`, integer division `5 / 2` would evaluate to `2`, losing the `.5` fraction!\n\n### Real-Life Example: Calculate User's Percentage\nIn a test where the maximum score is 500 and user scored 423:\n`float percentage = (float) userScore / maxScore * 100.0f;`",
    "syntax": "// Implicit conversion\nfloat myFloat = 9; // 9 becomes 9.000000\n\n// Explicit conversion (type casting)\nfloat result = (float) 5 / 2; // 2.500000",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Real-Life percentage calculation\n    int maxScore = 500;\n    int userScore = 423;\n\n    /* Calculate the percentage of the user's score in relation to the maximum score */\n    float percentage = (float) userScore / maxScore * 100.0;\n\n    // Print the percentage\n    printf(\"User's percentage is %.2f%%\\n\", percentage);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int num1 = 5;\n    int num2 = 2;\n    float sum = (float) num1 / num2;\n\n    printf(\"Without cast: %d\\n\", num1 / num2);\n    printf(\"With cast: %.1f\\n\", sum);\n    return 0;\n}",
    "expectedOutput": "Without cast: 2\nWith cast: 2.5",
    "exercise": {
      "question": "What syntax is used in C to explicitly cast variable x to a float?",
      "starterCode": "(float) x",
      "solution": "(float) x",
      "hint": "Put the target type inside parentheses before the variable."
    },
    "order": 9
  },
  {
    "id": "c-constants",
    "title": "C Constants",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Constants\nWhen you don't want others (or yourself) to change existing variable values, use the `const` keyword.\nThis will declare the variable as \"constant\", which means **unchangeable and read-only**:\n```c\nconst int myNum = 15; // myNum will always be 15\nmyNum = 10;           // error: assignment of read-only variable 'myNum'\n```\n\n### Good Practice for Constants\n\u2022 Always declare a constant variable with a value when created (you cannot assign it later).\n\u2022 It is considered good practice to declare constant variable names in **UPPERCASE** to distinguish them from regular variables:\n```c\nconst int BIRTHYEAR = 1980;\nconst float PI = 3.14159;\nconst int MINUTESPERHOUR = 60;\n```\n\n### Notes on Constants\nConstants are useful for values that are unlikely to change, such as PI, days in a week, or application limits. It protects the integrity of your code from accidental reassignment.",
    "syntax": "const int MINUTES_IN_HOUR = 60;\nconst float PI = 3.14159;\nconst char NEWLINE = '\\n';",
    "examples": "#include <stdio.h>\n\nint main() {\n    const int BIRTHYEAR = 2004;\n    const float PI = 3.14159;\n\n    printf(\"Birth year: %d\\n\", BIRTHYEAR);\n    printf(\"PI constant: %.5f\\n\", PI);\n\n    // Uncommenting below would trigger compiler error:\n    // BIRTHYEAR = 2000;\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    const int MINUTES_PER_HOUR = 60;\n    const int HOURS_PER_DAY = 24;\n    int totalMinutesInDay = MINUTES_PER_HOUR * HOURS_PER_DAY;\n    printf(\"Total minutes in a day: %d\\n\", totalMinutesInDay);\n    return 0;\n}",
    "expectedOutput": "Total minutes in a day: 1440",
    "exercise": {
      "question": "Which keyword makes a variable unchangeable and read-only in C?",
      "starterCode": "const",
      "solution": "const",
      "hint": "Short for constant."
    },
    "order": 10
  },
  {
    "id": "c-operators",
    "title": "C Operators",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Operators\nOperators are used to perform operations on variables and values.\nIn C, operators are divided into five main groups:\n\n### 1. Arithmetic Operators\n\u2022 `+` Addition (`x + y`)\n\u2022 `-` Subtraction (`x - y`)\n\u2022 `*` Multiplication (`x * y`)\n\u2022 `/` Division (`x / y`)\n\u2022 `%` Modulus (returns division remainder: `5 % 2 = 1`)\n\u2022 `++` Increment (increases value by 1: `++x`)\n\u2022 `--` Decrement (decreases value by 1: `--x`)\n\n### 2. Assignment Operators\nAssignment operators are used to assign values to variables: `=`, `+=`, `-=`, `*=`, `/=`, `%=`.\n\n### 3. Comparison Operators\nComparison operators return either `1` (true) or `0` (false):\n\u2022 `==` Equal to\n\u2022 `!=` Not equal\n\u2022 `>` Greater than\n\u2022 `<` Less than\n\u2022 `>=` Greater than or equal to\n\u2022 `<=` Less than or equal to\n\n### 4. Logical Operators\n\u2022 `&&` Logical AND: Returns 1 if both statements are true (`x < 5 && x < 10`)\n\u2022 `||` Logical OR: Returns 1 if one of the statements is true (`x < 5 || x < 4`)\n\u2022 `!` Logical NOT: Reverse the result (`!(x < 5 && x < 10)`)\n\n### 5. The `sizeof` Operator\nReturns the memory size (in bytes) of a data type or variable.",
    "syntax": "int sum = 100 + 50;\nint rem = 17 % 5;      // Remainder = 2\nx += 5;                // x = x + 5\nint isAdult = (age >= 18 && hasID == 1);",
    "examples": "#include <stdio.h>\n\nint main() {\n    int a = 15, b = 4;\n    printf(\"a + b = %d\\n\", a + b);\n    printf(\"a - b = %d\\n\", a - b);\n    printf(\"a * b = %d\\n\", a * b);\n    printf(\"a / b = %d (integer division)\\n\", a / b);\n    printf(\"a %% b = %d (modulus remainder)\\n\", a % b);\n\n    int x = 10;\n    x += 5; // x is now 15\n    printf(\"x after += 5: %d\\n\", x);\n    printf(\"Is x > 10? %d (1 = true, 0 = false)\\n\", x > 10);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int num1 = 25;\n    int num2 = 7;\n    printf(\"Quotient: %d\\n\", num1 / num2);\n    printf(\"Remainder: %d\\n\", num1 % num2);\n    return 0;\n}",
    "expectedOutput": "Quotient: 3\nRemainder: 4",
    "exercise": {
      "question": "Which operator is used to compare whether two values are equal in C?",
      "starterCode": "==",
      "solution": "==",
      "hint": "Two equals signs, not one."
    },
    "order": 11
  },
  {
    "id": "c-booleans",
    "title": "C Booleans",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Booleans\nVery often in programming, you will need a data type that can only have one of two values, like:\n\u2022 YES / NO\n\u2022 ON / OFF\n\u2022 TRUE / FALSE\n\nFor this, C has a `bool` data type, known as **booleans**. Booleans represent values that are either `true` or `false`.\n\n### The `<stdbool.h>` Header\nIn C, the `bool` type is not a built-in type (unlike `int` or `char`). It was introduced in C99, and you must import the `<stdbool.h>` header file to use it:\n```c\n#include <stdbool.h>\n\nbool isCodingFun = true;\nbool isFishTasty = false;\n```\n\n### Boolean Values as Integers\nA boolean is returned as an integer:\n\u2022 `1` represents `true`\n\u2022 `0` represents `false`\nWhen printing a boolean with `printf()`, you use the `%d` format specifier.\n\n### Real-Life Example: Voting Age\nLet's check if someone is old enough to vote (age 18 or older):\n```c\nint myAge = 25;\nint votingAge = 18;\nprintf(\"%d\\n\", myAge >= votingAge); // Returns 1 (true)!\n```",
    "syntax": "#include <stdbool.h>\n\nbool isProgrammingFun = true;\nbool isFishTasty = false;\n\nprintf(\"%d\\n\", isProgrammingFun); // Outputs 1\nprintf(\"%d\\n\", isFishTasty);       // Outputs 0",
    "examples": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    // Real-Life Voting Check Example\n    int myAge = 25;\n    int votingAge = 18;\n\n    printf(\"My Age: %d, Voting Age: %d\\n\", myAge, votingAge);\n    if (myAge >= votingAge) {\n        printf(\"Old enough to vote! (Check result: %d)\\n\", myAge >= votingAge);\n    } else {\n        printf(\"Not old enough to vote.\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    bool isHamburgerTasty = true;\n    bool isPizzaTasty = true;\n    printf(\"Hamburger tasty: %d\\n\", isHamburgerTasty);\n    printf(\"Pizza tasty: %d\\n\", isPizzaTasty);\n    return 0;\n}",
    "expectedOutput": "Hamburger tasty: 1\nPizza tasty: 1",
    "exercise": {
      "question": "What header file must you include to use bool, true, and false in C?",
      "starterCode": "<stdbool.h>",
      "solution": "<stdbool.h>",
      "hint": "Standard boolean header."
    },
    "order": 12
  },
  {
    "id": "c-if-else",
    "title": "C If...Else Conditions",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Conditions and If Statements\nYou have already learned that C supports the usual logical conditions from mathematics (`<`, `<=`, `>`, `>=`, `==`, `!=`).\nYou can use these conditions to perform different actions for different decisions.\n\nC has the following conditional statements:\n\u2022 Use `if` to specify a block of code to be executed, if a specified condition is true\n\u2022 Use `else` to specify a block of code to be executed, if the same condition is false\n\u2022 Use `else if` to specify a new condition to test, if the first condition is false\n\u2022 Use `switch` to specify many alternative blocks of code to be executed\n\n### The `if...else if...else` Syntax\n```c\nif (condition1) {\n  // block of code to be executed if condition1 is true\n} else if (condition2) {\n  // block of code to be executed if condition1 is false and condition2 is true\n} else {\n  // block of code to be executed if condition1 and condition2 are both false\n}\n```\n\n### Short Hand If...Else (Ternary Operator)\nIf you have only one statement to execute, one for `if`, and one for `else`, you can put it all on the same line:\n```c\nvariable = (condition) ? expressionTrue : expressionFalse;\n```\n\n### Real-Life Example: Door Access Code\nCheck whether an entered PIN matches `1337` to unlock a digital door.",
    "syntax": "if (time < 10) {\n    printf(\"Good morning.\\n\");\n} else if (time < 20) {\n    printf(\"Good day.\\n\");\n} else {\n    printf(\"Good evening.\\n\");\n}\n\n// Ternary shorthand:\nint time = 20;\n(time < 18) ? printf(\"Good day.\\n\") : printf(\"Good evening.\\n\");",
    "examples": "#include <stdio.h>\n\nint main() {\n    int myNum = 10; // Is number positive, negative, or zero?\n\n    if (myNum > 0) {\n        printf(\"The value is a positive number.\\n\");\n    } else if (myNum < 0) {\n        printf(\"The value is a negative number.\\n\");\n    } else {\n        printf(\"The value is 0.\\n\");\n    }\n\n    // Short hand if...else (ternary)\n    int doorCode = 1337;\n    (doorCode == 1337) ? printf(\"Door: OPEN\\n\") : printf(\"Door: LOCKED\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int time = 22;\n    if (time < 12) {\n        printf(\"Good morning.\\n\");\n    } else if (time < 18) {\n        printf(\"Good day.\\n\");\n    } else {\n        printf(\"Good evening.\\n\");\n    }\n    return 0;\n}",
    "expectedOutput": "Good evening.",
    "exercise": {
      "question": "What statement is used in C to test a second condition when the first 'if' condition is false?",
      "starterCode": "else if",
      "solution": "else if",
      "hint": "Two words: else followed by if."
    },
    "order": 13
  },
  {
    "id": "c-switch",
    "title": "C Switch Statement",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Switch Statement\nInstead of writing many `if..else` statements, you can use the `switch` statement.\nThe `switch` statement selects one of many code blocks to be executed.\n\n### How It Works\n1. The `switch` expression is evaluated once.\n2. The value of the expression is compared with the values of each `case`.\n3. If there is a match, the associated block of code is executed.\n4. The `break` statement breaks out of the switch block and stops the execution.\n5. The `default` statement is optional, and specifies some code to run if there is no case match.\n\n### The `break` Keyword\nWhen C reaches a `break` keyword, it breaks out of the switch block. This will stop the execution of more code and case testing inside the block. A break can save execution time because it ignores the rest of the code in the switch block.\n\n### The `default` Keyword\nThe `default` keyword specifies code to run if there is no case match. It acts as the fallback `else` block.",
    "syntax": "switch (expression) {\n  case x:\n    // code block\n    break;\n  case y:\n    // code block\n    break;\n  default:\n    // code block\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    int day = 4;\n\n    switch (day) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        case 4: printf(\"Thursday\\n\"); break;\n        case 5: printf(\"Friday\\n\"); break;\n        case 6: printf(\"Saturday\\n\"); break;\n        case 7: printf(\"Sunday\\n\"); break;\n        default: printf(\"Looking forward to the Weekend\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int day = 3;\n    switch (day) {\n        case 1: printf(\"Today is Monday\\n\"); break;\n        case 2: printf(\"Today is Tuesday\\n\"); break;\n        case 3: printf(\"Today is Wednesday\\n\"); break;\n        default: printf(\"Other weekday\\n\");\n    }\n    return 0;\n}",
    "expectedOutput": "Today is Wednesday",
    "exercise": {
      "question": "Which keyword is used to execute fallback code when no case matches in a switch statement?",
      "starterCode": "default",
      "solution": "default",
      "hint": "Default fallback block."
    },
    "order": 14
  },
  {
    "id": "c-while-loop",
    "title": "C While & Do/While Loop",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C While Loop\nLoops can execute a block of code as long as a specified condition is reached.\nLoops are handy because they save time, reduce errors, and make code more readable.\n\n### The While Loop\nThe `while` loop loops through a block of code as long as a specified condition is `true`:\n```c\nwhile (condition) {\n  // code block to be executed\n}\n```\n*Note:* Do not forget to increase the variable used in the condition (`i++`), otherwise the loop will never end (infinite loop)!\n\n### The Do/While Loop\nThe `do/while` loop is a variant of the while loop. This loop will execute the code block **once**, before checking if the condition is true, then it will repeat the loop as long as the condition is true:\n```c\ndo {\n  // code block to be executed\n} while (condition);\n```\nNotice the semicolon `;` at the end of the `do/while` loop!\n\n### Real-Life Example: Countdown Timer\nA rocket countdown timer from 3 down to 1, followed by \"Happy New Year!\".",
    "syntax": "int i = 0;\nwhile (i < 5) {\n    printf(\"%d\\n\", i);\n    i++;\n}\n\n// Do/while variant:\ndo {\n    printf(\"%d\\n\", i);\n    i++;\n} while (i < 5);",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Rocket Countdown Example\n    int countdown = 3;\n\n    while (countdown > 0) {\n        printf(\"%d...\\n\", countdown);\n        countdown--;\n    }\n    printf(\"Happy New Year!\\n\");\n\n    // Do/While execution test\n    int num = 10;\n    do {\n        printf(\"Executes at least once even if condition is false: num=%d\\n\", num);\n    } while (num < 5);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n    while (i <= 4) {\n        printf(\"Count: %d\\n\", i);\n        i++;\n    }\n    return 0;\n}",
    "expectedOutput": "Count: 1\nCount: 2\nCount: 3\nCount: 4",
    "exercise": {
      "question": "What must you remember to do inside a while loop to avoid an infinite loop?",
      "starterCode": "Update or increment the loop counter",
      "solution": "Increment/decrement the loop condition variable (e.g. i++)",
      "hint": "Ensure the condition eventually evaluates to false."
    },
    "order": 15
  },
  {
    "id": "c-for-loop",
    "title": "C For Loop & Nested Loops",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C For Loop\nWhen you know exactly how many times you want to loop through a block of code, use the `for` loop instead of a `while` loop:\n```c\nfor (expression 1; expression 2; expression 3) {\n  // code block to be executed\n}\n```\n\u2022 **Expression 1** is executed (one time) before the execution of the code block.\n\u2022 **Expression 2** defines the condition for executing the code block.\n\u2022 **Expression 3** is executed (every time) after the code block has been executed.\n\n### Nested Loops\nIt is also possible to place a loop inside another loop. This is called a **nested loop**.\nThe \"inner loop\" will be executed one time for each iteration of the \"outer loop\":\n```c\nfor (int i = 1; i <= 2; ++i) {\n  for (int j = 1; j <= 3; ++j) {\n    printf(\"%d,%d \", i, j);\n  }\n}\n```\n\n### Real-Life Example: Multiplication Table\nPrinting the multiplication table for a number (e.g., 2 x 1 through 2 x 5).",
    "syntax": "for (int i = 0; i < 5; i++) {\n    printf(\"%d\\n\", i);\n}\n\n// Even numbers only:\nfor (int i = 0; i <= 10; i += 2) {\n    printf(\"%d\\n\", i);\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Real-Life Multiplication Table for 2\n    int number = 2;\n    for (int i = 1; i <= 5; i++) {\n        printf(\"%d x %d = %d\\n\", number, i, number * i);\n    }\n\n    // Nested Loop Demo: 2x3 Matrix Grid\n    printf(\"Grid coordinates:\\n\");\n    for (int r = 1; r <= 2; r++) {\n        for (int c = 1; c <= 3; c++) {\n            printf(\"(%d,%d) \", r, c);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    for (int i = 0; i <= 6; i += 2) {\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "expectedOutput": "0 2 4 6 ",
    "exercise": {
      "question": "How many expressions are written inside the parentheses of a standard for loop header?",
      "starterCode": "3",
      "solution": "3 (initialization; condition; increment/decrement)",
      "hint": "Separated by two semicolons."
    },
    "order": 16
  },
  {
    "id": "c-break-continue",
    "title": "C Break and Continue",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Break and Continue\n\n### The `break` Statement\nYou have already seen the `break` statement used in an earlier chapter of this tutorial. It was used to \"jump out\" of a `switch` statement.\nThe `break` statement can also be used to jump out of a **loop**:\n```c\nfor (int i = 0; i < 10; i++) {\n  if (i == 4) {\n    break; // Stops loop when i reaches 4\n  }\n  printf(\"%d\\n\", i);\n}\n```\n\n### The `continue` Statement\nThe `continue` statement breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop:\n```c\nfor (int i = 0; i < 10; i++) {\n  if (i == 4) {\n    continue; // Skips the value of 4\n  }\n  printf(\"%d\\n\", i);\n}\n```\n\n### Break and Continue in While Loop\nYou can also use `break` and `continue` in `while` loops. Just be careful to update the counter before continuing, otherwise you might cause an infinite loop.",
    "syntax": "// Break jumps out of loop\nif (i == 5) break;\n\n// Continue skips to next iteration\nif (i == 5) continue;",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Break at 3:\\n\");\n    for (int i = 0; i < 6; i++) {\n        if (i == 3) break;\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\\n\");\n\n    printf(\"Continue skipping 3:\\n\");\n    for (int i = 0; i < 6; i++) {\n        if (i == 3) continue;\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i == 3) continue; // Skip 3\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "expectedOutput": "1 2 4 5 ",
    "exercise": {
      "question": "Which statement skips the current iteration and jumps to the next iteration of the loop?",
      "starterCode": "continue",
      "solution": "continue",
      "hint": "Starts with cont."
    },
    "order": 17
  },
  {
    "id": "c-arrays",
    "title": "C Arrays",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Arrays\nArrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.\nTo create an array, define the data type (like `int`) and specify the name of the array followed by square brackets `[]`.\nTo insert values to it, use a comma-separated list inside curly braces:\n```c\nint myNumbers[] = {25, 50, 75, 100};\n```\n\n### Access the Elements of an Array\nTo access an array element, refer to its index number.\nArray indexes start with `0`: `[0]` is the first element, `[1]` is the second element, etc.\n```c\nprintf(\"%d\", myNumbers[0]); // Outputs 25\n```\n\n### Change an Array Element\nTo change the value of a specific element, refer to the index number:\n`myNumbers[0] = 33;`\n\n### Loop Through an Array\nYou can loop through the array elements with the `for` loop.\n\n### Real-Life Example: Calculate the Average Age\nSum the elements of an array of ages and divide by the length to find the average age.",
    "syntax": "int myNumbers[] = {25, 50, 75, 100};\n\n// Access and modify:\nmyNumbers[0] = 33;\n\n// Loop through array:\nfor (int i = 0; i < 4; i++) {\n    printf(\"%d\\n\", myNumbers[i]);\n}",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Real-Life Average Age Example\n    int ages[] = {20, 22, 18, 35, 48, 26, 87, 70};\n    int length = sizeof(ages) / sizeof(ages[0]);\n    int totalAge = 0;\n\n    for (int i = 0; i < length; i++) {\n        totalAge += ages[i];\n    }\n\n    float avg = (float) totalAge / length;\n    printf(\"Total Persons: %d\\n\", length);\n    printf(\"Average Age: %.2f\\n\", avg);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int myNumbers[] = {25, 50, 75, 100};\n    myNumbers[0] = 33; // change first element\n    printf(\"First element: %d\\n\", myNumbers[0]);\n    printf(\"Second element: %d\\n\", myNumbers[1]);\n    return 0;\n}",
    "expectedOutput": "First element: 33\nSecond element: 50",
    "exercise": {
      "question": "How do you calculate the number of elements in an array 'myNumbers' in C?",
      "starterCode": "sizeof(myNumbers) / sizeof(myNumbers[0])",
      "solution": "sizeof(myNumbers) / sizeof(myNumbers[0])",
      "hint": "Divide total array byte size by the size of one element."
    },
    "order": 18
  },
  {
    "id": "c-strings",
    "title": "C Strings & String Functions",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Strings\nStrings are used for storing text/characters.\nUnlike many other programming languages, C does not have a `String` type to easily create string variables. Instead, you must use the `char` type and create an **array of characters** to make a string in C:\n```c\nchar greetings[] = \"Hello World!\";\nprintf(\"%s\", greetings);\n```\n*Note:* You must use double quotes `\"\"` for strings, and the format specifier `%s`.\n\n### Access and Modify Strings\nSince strings are actually arrays in C, you can access and modify a character by referring to its index number inside `[]`:\n```c\ngreetings[0] = 'J';\nprintf(\"%s\", greetings); // Outputs 'Jello World!'\n```\n\n### The Null-Terminator (`\\0`)\nC automatically adds a special character called the **null-terminating character** `\\0` at the very end of every string literal to tell the computer that the string ends here.\n\n### String Functions (`<string.h>`)\nC has a library `<string.h>` containing powerful built-in string functions:\n\u2022 `strlen(str)` : Returns the length of the string (excluding `\\0`)\n\u2022 `strcat(str1, str2)` : Concatenates (combines) `str2` to the end of `str1`\n\u2022 `strcpy(str1, str2)` : Copies `str2` into `str1`\n\u2022 `strcmp(str1, str2)` : Compares two strings (returns `0` if identical)",
    "syntax": "#include <string.h>\n\nchar greetings[] = \"Hello World!\";\nprintf(\"%s\\n\", greetings);\nprintf(\"Length: %zu\\n\", strlen(greetings));",
    "examples": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = \"Hello \";\n    char str2[] = \"World!\";\n\n    printf(\"str1 length: %zu\\n\", strlen(str1));\n\n    // Concatenate str2 to str1\n    strcat(str1, str2);\n    printf(\"Concatenated: %s\\n\", str1);\n\n    // Compare strings\n    printf(\"Compare str1 with str2: %d\\n\", strcmp(str1, str2));\n    printf(\"Compare identical strings: %d\\n\", strcmp(\"C\", \"C\"));\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char alphabet[] = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    printf(\"Length is: %zu\\n\", strlen(alphabet));\n    printf(\"Size is: %zu (includes \\\\0)\\n\", sizeof(alphabet));\n    return 0;\n}",
    "expectedOutput": "Length is: 26\nSize is: 27 (includes \\0)",
    "exercise": {
      "question": "Which function from <string.h> returns the length of a string in C?",
      "starterCode": "strlen()",
      "solution": "strlen()",
      "hint": "Short for string length."
    },
    "order": 19
  },
  {
    "id": "c-user-input",
    "title": "C User Input (scanf & fgets)",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C User Input\nYou have already learned that `printf()` is used to output values in C.\nTo get user input, you can use the `scanf()` function.\n\n### The `scanf()` Function\nThe `scanf()` function takes two arguments:\n1. The format specifier of the variable (e.g. `%d` for integer)\n2. The reference operator (`&`), followed by the variable name, which stores the memory address of the variable.\n```c\nint myNum;\nprintf(\"Type a number: \\n\");\nscanf(\"%d\", &myNum);\nprintf(\"Your number is: %d\", myNum);\n```\n\n### Why the `&` (Address-Of) Operator?\nThe `&` operator tells `scanf()` the exact memory location where it should write the user's input. Without `&`, the compiler would pass a copy of the value, and the variable wouldn't receive the input!\n\n### Reading Strings & `fgets()` Nuance\nWhen reading a string with `scanf(\"%s\", str)`, note that it stops reading when it encounters whitespace (spaces, tabs, newlines).\nTo read a whole line of text (including spaces), use the safer `fgets()` function:\n```c\nchar fullName[30];\nfgets(fullName, sizeof(fullName), stdin);\n```",
    "syntax": "int myNum;\nscanf(\"%d\", &myNum);\n\nchar firstName[30];\nscanf(\"%s\", firstName); // Arrays already act as pointers, no & needed\n\nchar fullName[50];\nfgets(fullName, sizeof(fullName), stdin);",
    "examples": "#include <stdio.h>\n\nint main() {\n    // Simulated input demonstration\n    int userAge = 21;\n    char userGrade = 'A';\n\n    printf(\"Input simulated:\\n\");\n    printf(\"Age: %d\\n\", userAge);\n    printf(\"Grade: %c\\n\", userGrade);\n    printf(\"In interactive terminal: scanf(\\\"%%d\\\", &userAge) reads stdin.\\n\");\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int number = 42;\n    printf(\"User selected number: %d\\n\", number);\n    printf(\"Memory address registered at &number\\n\");\n    return 0;\n}",
    "expectedOutput": "User selected number: 42\nMemory address registered at &number",
    "exercise": {
      "question": "Why must you prefix numeric variables with '&' when passing them to scanf()?",
      "starterCode": "To pass the memory address of the variable",
      "solution": "To pass its memory address so scanf() can write the input value directly to it",
      "hint": "Address-of operator."
    },
    "order": 20
  },
  {
    "id": "c-memory-address",
    "title": "C Memory Address",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Memory Address\nWhen a variable is created in C, a memory address is assigned to the variable.\nThe memory address is the physical location of where the variable is stored on the computer's RAM chips.\n\n### The Address-Of (`&`) Operator\nTo access the memory address of a variable, use the reference operator (`&`), and its result will represent where the variable is stored:\n```c\nint myAge = 43;\nprintf(\"%p\", (void*)&myAge);\n```\n*Note:* The format specifier `%p` is used to print pointer memory addresses, which are displayed as hexadecimal numbers (e.g. `0x7ffeefbff5ac`).\n\n### Why Memory Addresses Matter\nMemory addresses are crucial in C because they allow you to:\n1. Manipulate data directly in the computer's memory.\n2. Pass large data structures (like arrays, structs) into functions efficiently without copying.\n3. Form dynamic data structures like Linked Lists, Trees, and Graphs using pointers.",
    "syntax": "int myAge = 43;\n// Print variable value:\nprintf(\"%d\\n\", myAge);\n// Print variable memory address:\nprintf(\"%p\\n\", (void*)&myAge);",
    "examples": "#include <stdio.h>\n\nint main() {\n    int myAge = 43;\n    int studentScore = 95;\n\n    printf(\"myAge value: %d\\n\", myAge);\n    printf(\"myAge memory address: %p\\n\", (void*)&myAge);\n    printf(\"studentScore memory address: %p\\n\", (void*)&studentScore);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int myNum = 100;\n    printf(\"Variable Value: %d\\n\", myNum);\n    printf(\"Physical RAM Address: %p\\n\", (void*)&myNum);\n    return 0;\n}",
    "expectedOutput": "Variable Value: 100\nPhysical RAM Address: [hexadecimal address]",
    "exercise": {
      "question": "Which format specifier is used with printf to display a pointer or memory address?",
      "starterCode": "%p",
      "solution": "%p",
      "hint": "Stands for pointer."
    },
    "order": 21
  },
  {
    "id": "c-pointers",
    "title": "C Pointers & Dereferencing",
    "category": "tutorial",
    "categoryTitle": "C TUTORIAL",
    "concepts": "### C Pointers\nYou have learned in the previous chapter that we can get the memory address of a variable by using the reference operator `&`.\nA **pointer** is a variable that stores the memory address of another variable as its value.\n\n### Creating Pointers\nA pointer variable points to a data type (like `int`) of the same type, and is created with the `*` operator:\n```c\nint myAge = 43;     // An int variable\nint* ptr = &myAge;  // A pointer variable, with the name ptr, that stores the address of myAge\n\n// Output the value of myAge (43)\nprintf(\"%d\\n\", myAge);\n\n// Output the memory address of myAge\nprintf(\"%p\\n\", &myAge);\n\n// Output the memory address of myAge with the pointer\nprintf(\"%p\\n\", ptr);\n```\n\n### Dereference Operator (`*`)\nYou can also use the `*` operator to get the **value** of the variable the pointer points to (this is called the **dereference** operator):\n```c\nprintf(\"%d\\n\", *ptr); // Outputs 43\n```\n*Key rule:* \n\u2022 `ptr` outputs the memory address\n\u2022 `*ptr` outputs the value stored at that address (dereference)\n\n### Pointers and Data Structures\nPointers are the essential foundation for Data Structures: Linked Lists, Stacks, Queues, Binary Trees, and Graphs all link their nodes together using C pointers!",
    "syntax": "int myAge = 43;\nint* ptr = &myAge; // Pointer declaration\n\nprintf(\"%p\\n\", ptr);  // Memory address\nprintf(\"%d\\n\", *ptr); // Dereference: outputs 43\n\n*ptr = 50; // Modifies myAge directly through pointer!",
    "examples": "#include <stdio.h>\n\nint main() {\n    int myAge = 43;     // An int variable\n    int* ptr = &myAge;  // A pointer variable that stores the address of myAge\n\n    printf(\"myAge value: %d\\n\", myAge);\n    printf(\"myAge address (&myAge): %p\\n\", (void*)&myAge);\n    printf(\"ptr holds address: %p\\n\", (void*)ptr);\n    printf(\"Dereferenced *ptr value: %d\\n\", *ptr);\n\n    // Change value via pointer\n    *ptr = 21;\n    printf(\"After *ptr = 21, myAge is now: %d\\n\", myAge);\n    return 0;\n}",
    "sampleCode": "#include <stdio.h>\n\nint main() {\n    int number = 42;\n    int* pNumber = &number;\n\n    printf(\"Original value: %d\\n\", number);\n    *pNumber = 99; // Dereference and write\n    printf(\"Updated value via pointer: %d\\n\", number);\n    return 0;\n}",
    "expectedOutput": "Original value: 42\nUpdated value via pointer: 99",
    "exercise": {
      "question": "What operator is used to dereference a pointer to read or modify the value at its address?",
      "starterCode": "*",
      "solution": "* (asterisk / dereference operator)",
      "hint": "Asterisk operator."
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
    "concepts": "Comprehensive curriculum mastery certification criteria covering C syntax, pointer mechanics, struct architecture, and memory allocation.",
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
    "concepts": "Standard academic examination Part-A and Part-B programming question walkthroughs.",
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
    "concepts": "Official C Programming curriculum syllabus, course outcomes (CO1 - CO5), and textbook reference list.",
    "syntax": "// Course syllabus reference",
    "examples": "#include <stdio.h>\n\nint main() {\n    printf(\"Core C Curriculum: Unit I to Unit V\\n\");\n    return 0;\n}",
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
