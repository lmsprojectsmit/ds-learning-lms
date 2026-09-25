import type { CFundamentalLesson, DSTopic, TopicStepInfo, UserProgress } from '../types/lms';
import { C_TUTORIAL_LESSONS } from './cTutorialData';

export const TOPIC_STEPS: TopicStepInfo[] = [
  { id: 'concept', stepNumber: 1, title: 'Concept', subtitle: 'What is it? Why do we use it?', iconName: 'Lightbulb' },
  { id: 'videos', stepNumber: 2, title: 'Videos', subtitle: 'Watch video explanations', iconName: 'PlayCircle' },
  { id: 'materials', stepNumber: 3, title: 'Materials', subtitle: 'Notes, PDFs, diagrams', iconName: 'FileText' },
  { id: 'theory', stepNumber: 4, title: 'Conceptual Explanation', subtitle: 'Detailed theory with illustrations', iconName: 'BookOpen' },
  { id: 'c_implementation', stepNumber: 5, title: 'C Program Implementation', subtitle: 'Structure, functions and logic', iconName: 'Code' },
  { id: 'mcq', stepNumber: 6, title: 'MCQ Assessment', subtitle: 'Test your understanding', iconName: 'HelpCircle' },
  { id: 'implementation_video', stepNumber: 7, title: 'C Implementation Video', subtitle: 'Step-by-step implementation', iconName: 'Video' },
  { id: 'example_explanation', stepNumber: 8, title: 'Example + Explanation', subtitle: 'Complete code with explanation', iconName: 'Terminal' },
  { id: 'coding_assessment', stepNumber: 9, title: 'Coding Assessment', subtitle: 'Solve problems related to the topic', iconName: 'CheckSquare' },
];

export const C_FUNDAMENTALS_LESSONS: CFundamentalLesson[] = C_TUTORIAL_LESSONS;

export const DS_TOPICS: DSTopic[] = [
  {
    id: 'singly-linked-list',
    category: 'linked_list',
    categoryTitle: 'Linked List',
    title: 'Singly Linked List',
    subvariety: 'Singly Linked List',
    summary: 'A linear collection of data elements called nodes, where each node points to the next node in memory.',
    conceptWhat: 'A Singly Linked List is a dynamic linear data structure composed of sequential nodes. Each node stores two items: the data payload and a pointer/reference to the subsequent node in the sequence. The first node is referenced by the "head" pointer, and the last node points to NULL.',
    conceptWhy: 'Unlike arrays, Singly Linked Lists do not require contiguous memory blocks. Insertion and deletion at the beginning or after a given node can be achieved in O(1) time without shifting existing elements, making them ideal for dynamic collections where size is unpredictable.',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1) at head, O(n) at tail',
      deletion: 'O(1) at head, O(n) at tail'
    },
    video: {
      title: 'Singly Linked List in C: Concept & Pointer Mechanics',
      url: 'https://www.youtube.com/embed/R9PTBwOzceo',
      duration: '14 mins',
      transcriptHighlights: [
        '00:00 - Introduction & Memory Allocation differences with Arrays',
        '03:45 - Creating the Node structure with self-referential pointers',
        '07:15 - Insertion at beginning, middle, and end',
        '11:30 - Traversing and freeing memory safely'
      ]
    },
    materials: {
      notesSummary: 'Anna University 2025 Regulation Unit-1 Reference Sheet for Singly Linked Lists.',
      bulletPoints: [
        'Head pointer contains the address of the first node.',
        'Null pointer in the link field of the last node signals the end of the list.',
        'Traversal begins at head and proceeds sequentially: current = current->next until current == NULL.',
        'Edge case handling: Insertion into an empty list requires setting head = newNode.'
      ],
      keyTakeaways: [
        'Dynamic size prevents buffer overflow.',
        'Requires extra memory per node for the pointer field.',
        'No direct or random access (cannot do list[i]).'
      ]
    },
    conceptualExplanation: {
      theory: `Each node in a Singly Linked List resides independently in heap memory. Pointers bind them logically:

[ HEAD ] ---> [ Data: 10 | Next ] ---> [ Data: 20 | Next ] ---> [ Data: 30 | NULL ]

When inserting at the beginning:
1. Allocate memory for newNode using malloc.
2. Assign newNode->data = value.
3. Point newNode->next = head.
4. Update head = newNode.`,
      memoryModelDiagram: `+--------------+      +--------------+      +--------------+
| [10 | 0x200] | ---> | [20 | 0x300] | ---> | [30 | NULL ] |
+--------------+      +--------------+      +--------------+
Address: 0x100        Address: 0x200        Address: 0x300`,
      stepByStepFlow: [
        'Step 1: Check if list is empty (head == NULL).',
        'Step 2: Allocate newNode = (struct Node*) malloc(sizeof(struct Node)).',
        'Step 3: Assign data and initialize next = NULL.',
        'Step 4: Traverse using temp pointer: while (temp->next != NULL) temp = temp->next.',
        'Step 5: Link temp->next = newNode.'
      ]
    },
    cProgramImplementation: {
      description: 'Standard implementation of Singly Linked List supporting insert at beginning, insert at end, delete node, and display.',
      structDefinition: `struct Node {
    int data;
    struct Node* next;
};`,
      coreFunctions: [
        {
          name: 'insertAtBeginning',
          description: 'Inserts new node at the start of the list in O(1) time.',
          codeSnippet: `void insertAtBeginning(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}`
        },
        {
          name: 'display',
          description: 'Traverses and prints all node values sequentially.',
          codeSnippet: `void display(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}`
        }
      ],
      fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtEnd(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void display(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\\n");
}

int main() {
    struct Node* head = NULL;
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    display(head);
    return 0;
}`
    },
    mcqs: [
      {
        id: 'sll-q1',
        question: 'What is the time complexity to insert a node at the beginning of a singly linked list if head is known?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctIndex: 0,
        explanation: 'Inserting at head only requires updating two pointer assignments, which is independent of the list length: O(1).'
      },
      {
        id: 'sll-q2',
        question: 'Which of the following is TRUE regarding a singly linked list compared to an array?',
        options: [
          'Elements are stored in contiguous memory locations',
          'Random access is allowed in O(1) time',
          'Dynamic size allows memory to grow or shrink at runtime',
          'No extra memory is needed for pointers'
        ],
        correctIndex: 2,
        explanation: 'Linked lists allocate nodes dynamically in heap memory, so their size can grow or shrink as needed.'
      },
      {
        id: 'sll-q3',
        question: 'In a singly linked list, what does the next pointer of the last node store?',
        options: ['Address of head', 'NULL', 'Garbage address', 'Address of second node'],
        correctIndex: 1,
        explanation: 'In a standard singly linked list, the final node contains NULL to signify the end of the chain.'
      }
    ],
    implementationVideo: {
      title: 'C Coding Singly Linked List from Scratch',
      duration: '18 mins',
      walkthroughSteps: [
        'Writing node structure with typedef',
        'Handling NULL head edge case',
        'Implementing traversal loop safely',
        'Cleaning up allocated memory with free()'
      ]
    },
    exampleExplanation: {
      scenario: 'Building a simple student waiting queue where newcomers are appended to the end and served from head.',
      fullCodeWithComments: `// Singly Linked List Implementation in C
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Insert at the end of the list
void append(struct Node** headRef, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    struct Node* last = *headRef;
    new_node->data = new_data;
    new_node->next = NULL;

    if (*headRef == NULL) {
        *headRef = new_node;
        return;
    }
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = new_node;
}

int main() {
    struct Node* head = NULL;
    append(&head, 5);
    append(&head, 15);
    append(&head, 25);
    // head now contains 5 -> 15 -> 25 -> NULL
    return 0;
}`,
      lineByLineExplanation: [
        { lines: '5-8', note: 'Defines the Node structure holding an integer data and next pointer.' },
        { lines: '12-14', note: 'Allocates memory on the heap and initializes new node data and next to NULL.' },
        { lines: '16-19', note: 'Handles base case: if list is empty, newly created node becomes head.' },
        { lines: '20-22', note: 'Traverses to the current tail node and links its next pointer to new_node.' }
      ]
    },
    codingAssessment: {
      id: 'code-sll-insert',
      title: 'Implement Singly Linked List Insertion & Print',
      difficulty: 'Easy',
      problemStatement: 'Given N integers, insert each integer at the end of a Singly Linked List and print the final sequence separated by spaces.',
      inputFormat: 'Line 1: An integer N representing number of elements.\nLine 2: N space-separated integers.',
      outputFormat: 'Print the linked list elements in order separated by spaces.',
      constraints: '1 <= N <= 1000\n-10000 <= element <= 10000',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// TODO: Complete the function to append a node
void append(struct Node** head_ref, int new_data) {
    // Write your code here
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = new_data;
    newNode->next = NULL;
    
    if (*head_ref == NULL) {
        *head_ref = newNode;
        return;
    }
    struct Node* temp = *head_ref;
    while(temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d ", node->data);
        node = node->next;
    }
    printf("\\n");
}

int main() {
    struct Node* head = NULL;
    int n, val;
    if (scanf("%d", &n) != 1) return 0;
    for(int i = 0; i < n; i++) {
        scanf("%d", &val);
        append(&head, val);
    }
    printList(head);
    return 0;
}`,
      solutionReference: `// Complete tested solution for Singly Linked List Append`,
      testCases: [
        {
          id: 'sll-tc1',
          description: 'Basic 3 element sequence',
          input: '3\n10 20 30',
          expectedOutput: '10 20 30'
        },
        {
          id: 'sll-tc2',
          description: 'Single element list',
          input: '1\n99',
          expectedOutput: '99'
        },
        {
          id: 'sll-tc3',
          description: 'Negative and mixed values',
          input: '4\n5 -2 0 100',
          expectedOutput: '5 -2 0 100',
          isHidden: true
        }
      ]
    }
  },
  {
    id: 'doubly-linked-list',
    category: 'linked_list',
    categoryTitle: 'Linked List',
    title: 'Doubly Linked List',
    subvariety: 'Doubly Linked List',
    summary: 'A linked data structure where each node contains pointers to both the next node and previous node, enabling bidirectional traversal.',
    conceptWhat: 'A Doubly Linked List (DLL) contains an extra pointer typically called "prev", alongside "data" and "next". This enables moving both forwards and backwards through the chain.',
    conceptWhy: 'Enables O(1) node deletion when a direct pointer to the target node is given (no need to traverse from head to find predecessor). Crucial for browser history, undo/redo buffers, and LRU caches.',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1) at head/tail',
      deletion: 'O(1) if node reference is known'
    },
    video: {
      title: 'Doubly Linked List: Bidirectional Pointers in C',
      url: 'https://www.youtube.com/embed/JdQeNxWCguQ',
      duration: '16 mins',
      transcriptHighlights: [
        '00:00 - DLL Node structure: prev, data, next',
        '05:00 - Insertion at head and adjusting 4 pointer links',
        '10:30 - Backward traversal demonstration',
        '14:00 - Node deletion without predecessor search'
      ]
    },
    materials: {
      notesSummary: 'Unit-1 Doubly Linked List Architecture & Operations.',
      bulletPoints: [
        'Head->prev is always NULL.',
        'Tail->next is always NULL.',
        'Requires 2 pointer spaces per node (prev and next).',
        'Enables reverse traversal without auxiliary stack.'
      ],
      keyTakeaways: [
        'More versatile than Singly Linked List.',
        'Higher memory overhead per node.',
        'Care must be taken to update both forward and backward links.'
      ]
    },
    conceptualExplanation: {
      theory: `Node layout in DLL:
[ NULL <- | Prev | Data | Next | -> NextNode ]

Forward and backward navigation:
NULL <--- [ 10 ] <===> [ 20 ] <===> [ 30 ] ---> NULL`,
      memoryModelDiagram: `+-----------------------+     +-----------------------+
| prev=NULL | 10 | next | <=> | prev | 20 | next=NULL |
+-----------------------+     +-----------------------+`,
      stepByStepFlow: [
        '1. Allocate newNode.',
        '2. Set newNode->prev = NULL, newNode->next = head.',
        '3. If head != NULL, set head->prev = newNode.',
        '4. Update head = newNode.'
      ]
    },
    cProgramImplementation: {
      description: 'C implementation of Doubly Linked List with forward and backward display.',
      structDefinition: `struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};`,
      coreFunctions: [
        {
          name: 'insertFront',
          description: 'Inserts a node at the head of DLL.',
          codeSnippet: `void insertFront(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->prev = NULL;
    newNode->next = *head;
    if (*head != NULL) (*head)->prev = newNode;
    *head = newNode;
}`
        }
      ],
      fullCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void insertFront(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->prev = NULL;
    newNode->next = *head;
    if (*head != NULL) (*head)->prev = newNode;
    *head = newNode;
}

void printForward(struct Node* head) {
    while(head) {
        printf("%d ", head->data);
        head = head->next;
    }
    printf("\\n");
}

int main() {
    struct Node* head = NULL;
    insertFront(&head, 30);
    insertFront(&head, 20);
    insertFront(&head, 10);
    printForward(head);
    return 0;
}`
    },
    mcqs: [
      {
        id: 'dll-q1',
        question: 'How many pointer fields are present in each node of a doubly linked list?',
        options: ['1', '2', '3', '4'],
        correctIndex: 1,
        explanation: 'Each node stores two pointers: prev (pointing to preceding node) and next (pointing to succeeding node).'
      }
    ],
    implementationVideo: {
      title: 'Step-by-step DLL C Walkthrough',
      duration: '12 mins',
      walkthroughSteps: ['Creating node', 'Linking prev and next', 'Reverse traversal test']
    },
    exampleExplanation: {
      scenario: 'Browser history: Back button uses prev pointer, Forward button uses next pointer.',
      fullCodeWithComments: `// DLL implementation sample`,
      lineByLineExplanation: [{ lines: '1-10', note: 'Standard DLL setup' }]
    },
    codingAssessment: {
      id: 'code-dll-reverse',
      title: 'Reverse Traversal of Doubly Linked List',
      difficulty: 'Medium',
      problemStatement: 'Read N integers, create a Doubly Linked List, and print the elements in reverse order (from tail to head).',
      inputFormat: 'Line 1: N\nLine 2: N space-separated numbers.',
      outputFormat: 'Numbers printed from last to first separated by spaces.',
      constraints: '1 <= N <= 500',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

int main() {
    int n;
    if(scanf("%d", &n) != 1) return 0;
    int arr[500];
    for(int i=0; i<n; i++) scanf("%d", &arr[i]);
    for(int i=n-1; i>=0; i--) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      solutionReference: `// Reversed output`,
      testCases: [
        {
          id: 'dll-tc1',
          description: 'Basic reversal',
          input: '3\n1 2 3',
          expectedOutput: '3 2 1'
        },
        {
          id: 'dll-tc2',
          description: 'Single element',
          input: '1\n42',
          expectedOutput: '42'
        }
      ]
    }
  },
  {
    id: 'stack-ds',
    category: 'stack',
    categoryTitle: 'Stack',
    title: 'Stack (LIFO)',
    subvariety: 'Array & Linked List representation',
    summary: 'A linear data structure following Last-In-First-Out (LIFO) order with push, pop, and peek operations.',
    conceptWhat: 'A Stack is a linear data structure that adheres to the LIFO (Last-In-First-Out) principle. The element inserted last is the first one to be removed. All operations happen at a single point called the TOP.',
    conceptWhy: 'Stacks are fundamental to computer science: function call stacks (recursion), undo mechanisms in text editors, parentheses balancing in compilers, and expression conversions (Infix to Postfix).',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1) (Push)',
      deletion: 'O(1) (Pop)'
    },
    video: {
      title: 'Stack Data Structure in C: Array vs Linked List',
      url: 'https://www.youtube.com/embed/F1F2imiOJfk',
      duration: '15 mins',
      transcriptHighlights: [
        '00:00 - Real world stack examples (plates, call stack)',
        '04:00 - Stack operations: Push, Pop, Peek, isEmpty, isFull',
        '08:30 - Array-based stack overflow and underflow conditions',
        '12:00 - Linked list implementation for infinite capacity'
      ]
    },
    materials: {
      notesSummary: 'Unit-2 Anna University Stack Concepts & Applications.',
      bulletPoints: [
        'Top index initialized to -1 in array representation.',
        'Stack Overflow: pushing when top == MAX_SIZE - 1.',
        'Stack Underflow: popping when top == -1.',
        'All push/pop/peek operations execute in strict O(1) time.'
      ],
      keyTakeaways: [
        'LIFO principle.',
        'Constant time O(1) push and pop.',
        'Crucial for recursion and syntax parsing.'
      ]
    },
    conceptualExplanation: {
      theory: `Stack operations visualized:
PUSH(10) -> [10] (top=0)
PUSH(20) -> [20] (top=1)
            [10]
POP()    -> Returns 20, new top is 10.`,
      memoryModelDiagram: `+------------+
|  30 [TOP]  |
+------------+
|     20     |
+------------+
|     10     |
+------------+`,
      stepByStepFlow: [
        'Push: Check if top == MAX-1. If not, top++, arr[top] = val.',
        'Pop: Check if top == -1. If not, val = arr[top], top--.'
      ]
    },
    cProgramImplementation: {
      description: 'Array implementation of Stack in C.',
      structDefinition: `#define MAX 100
int stack[MAX];
int top = -1;`,
      coreFunctions: [
        {
          name: 'push',
          description: 'Adds item to top of stack.',
          codeSnippet: `void push(int x) {
    if (top >= MAX - 1) { printf("Stack Overflow\\n"); return; }
    stack[++top] = x;
}`
        },
        {
          name: 'pop',
          description: 'Removes and returns top item.',
          codeSnippet: `int pop() {
    if (top < 0) { printf("Stack Underflow\\n"); return -1; }
    return stack[top--];
}`
        }
      ],
      fullCode: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int x) {
    if (top >= MAX - 1) return;
    stack[++top] = x;
}

int pop() {
    if (top < 0) return -1;
    return stack[top--];
}

int main() {
    push(5);
    push(15);
    push(25);
    printf("%d %d %d\\n", pop(), pop(), pop());
    return 0;
}`
    },
    mcqs: [
      {
        id: 'stk-q1',
        question: 'Which principle does a Stack follow?',
        options: ['FIFO', 'LIFO', 'Priority', 'Random'],
        correctIndex: 1,
        explanation: 'Stack operates on Last-In-First-Out (LIFO).'
      }
    ],
    implementationVideo: {
      title: 'Building Stack in C with Array & Linked List',
      duration: '14 mins',
      walkthroughSteps: ['Implementing push', 'Implementing pop', 'Checking edge cases']
    },
    exampleExplanation: {
      scenario: 'Reversing a string using a stack.',
      fullCodeWithComments: `// Stack demonstration`,
      lineByLineExplanation: [{ lines: '1-5', note: 'Stack buffer' }]
    },
    codingAssessment: {
      id: 'code-stack-balanced',
      title: 'Balanced Parentheses Checker',
      difficulty: 'Medium',
      problemStatement: 'Given a string containing characters () and [], determine if the parentheses are balanced using stack logic. Output "YES" if balanced, "NO" otherwise.',
      inputFormat: 'A string of brackets.',
      outputFormat: 'YES or NO',
      constraints: 'String length between 1 and 100',
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char s[200];
    if (scanf("%s", s) != 1) return 0;
    
    char stack[200];
    int top = -1;
    int valid = 1;
    
    for(int i = 0; s[i] != '\\0'; i++) {
        char ch = s[i];
        if (ch == '(' || ch == '[') {
            stack[++top] = ch;
        } else if (ch == ')') {
            if (top >= 0 && stack[top] == '(') top--;
            else { valid = 0; break; }
        } else if (ch == ']') {
            if (top >= 0 && stack[top] == '[') top--;
            else { valid = 0; break; }
        }
    }
    if (valid && top == -1) printf("YES\\n");
    else printf("NO\\n");
    return 0;
}`,
      solutionReference: `// Balanced checker`,
      testCases: [
        {
          id: 'stk-tc1',
          description: 'Valid matching pairs',
          input: '()[()]',
          expectedOutput: 'YES'
        },
        {
          id: 'stk-tc2',
          description: 'Mismatched brackets',
          input: '(]',
          expectedOutput: 'NO'
        },
        {
          id: 'stk-tc3',
          description: 'Unclosed bracket',
          input: '(()',
          expectedOutput: 'NO',
          isHidden: true
        }
      ]
    }
  },
  {
    id: 'queue-ds',
    category: 'queue',
    categoryTitle: 'Queue',
    title: 'Queue (FIFO)',
    subvariety: 'Simple, Circular & Priority Queue',
    summary: 'A linear data structure following First-In-First-Out (FIFO) where elements are added at rear and removed from front.',
    conceptWhat: 'A Queue works on the FIFO (First-In-First-Out) principle. Elements enter via ENQUEUE at the rear and exit via DEQUEUE from the front, exactly like people waiting in a ticket line.',
    conceptWhy: 'Used in CPU scheduling (Round Robin), disk scheduling, printer spooling, and Breadth-First Search (BFS) in trees and graphs.',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1) (Enqueue)',
      deletion: 'O(1) (Dequeue)'
    },
    video: {
      title: 'Circular Queue and Queue in C',
      url: 'https://www.youtube.com/embed/okr-XE8yTO8',
      duration: '17 mins',
      transcriptHighlights: [
        '00:00 - Introduction to FIFO Queue',
        '04:30 - Array limitations and circular queue modulo arithmetic',
        '10:00 - Enqueue and Dequeue operations in C',
        '14:00 - Priority Queue concepts'
      ]
    },
    materials: {
      notesSummary: 'Unit-2 Queue Operations and Circular Queue modulo pointers.',
      bulletPoints: [
        'Front index marks removal point, Rear marks insertion point.',
        'Circular queue wraps around using rear = (rear + 1) % CAPACITY.',
        'Priority queue serves elements based on priority rather than arrival time.'
      ],
      keyTakeaways: ['FIFO discipline', 'Circular indexing eliminates wasted slots']
    },
    conceptualExplanation: {
      theory: `Circular Queue wraps indices:
front = (front + 1) % MAX
rear = (rear + 1) % MAX`,
      memoryModelDiagram: `[Front: 0] ---> [10] [20] [30] <--- [Rear: 2]`,
      stepByStepFlow: ['Enqueue: rear = (rear + 1) % MAX', 'Dequeue: front = (front + 1) % MAX']
    },
    cProgramImplementation: {
      description: 'Circular Queue implementation in C with modulo arithmetic.',
      structDefinition: `#define SIZE 5
int items[SIZE];
int front = -1, rear = -1;`,
      coreFunctions: [
        {
          name: 'enQueue',
          description: 'Inserts element at rear in O(1)',
          codeSnippet: `void enQueue(int element) {
    if ((front == rear + 1) || (front == 0 && rear == SIZE - 1)) return;
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    items[rear] = element;
}`
        }
      ],
      fullCode: `#include <stdio.h>
#define SIZE 5

int queue[SIZE];
int front = 0, rear = 0, count = 0;

void enqueue(int val) {
    if (count == SIZE) return;
    queue[rear] = val;
    rear = (rear + 1) % SIZE;
    count++;
}

int dequeue() {
    if (count == 0) return -1;
    int val = queue[front];
    front = (front + 1) % SIZE;
    count--;
    return val;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30);
    printf("%d %d\\n", dequeue(), dequeue());
    return 0;
}`
    },
    mcqs: [
      {
        id: 'q-q1',
        question: 'Which operation is used to insert an item into a queue?',
        options: ['Push', 'Enqueue', 'Dequeue', 'Peek'],
        correctIndex: 1,
        explanation: 'Enqueue inserts an item at the rear of the queue.'
      }
    ],
    implementationVideo: {
      title: 'Circular Queue Coding in C',
      duration: '15 mins',
      walkthroughSteps: ['Handling modulo wrap', 'Displaying active elements']
    },
    exampleExplanation: {
      scenario: 'Print job scheduler handling documents sequentially.',
      fullCodeWithComments: `// Queue code`,
      lineByLineExplanation: [{ lines: '1-5', note: 'Buffer setup' }]
    },
    codingAssessment: {
      id: 'code-queue-ops',
      title: 'Implement Queue Enqueue and Dequeue',
      difficulty: 'Easy',
      problemStatement: 'Read N integers, enqueue them into a queue, dequeue 2 elements, and print the remaining queue contents.',
      inputFormat: 'Line 1: N (N >= 3)\nLine 2: N space-separated integers.',
      outputFormat: 'Remaining elements separated by spaces.',
      constraints: '3 <= N <= 100',
      starterCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for(int i=0; i<n; i++) scanf("%d", &arr[i]);
    // Dequeue 2 elements means print from index 2 onwards
    for(int i=2; i<n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      solutionReference: `// Output from index 2`,
      testCases: [
        {
          id: 'q-tc1',
          description: 'Queue of 4 numbers, dequeue 2',
          input: '4\n10 20 30 40',
          expectedOutput: '30 40'
        },
        {
          id: 'q-tc2',
          description: 'Queue of 3 numbers',
          input: '3\n1 2 3',
          expectedOutput: '3'
        }
      ]
    }
  },
  {
    id: 'tree-ds',
    category: 'tree',
    categoryTitle: 'Tree',
    title: 'Binary Search Tree & Trees',
    subvariety: 'Binary Tree, BST, AVL Tree, Heap',
    summary: 'A hierarchical non-linear data structure of connected nodes where each node has at most two children in binary trees.',
    conceptWhat: 'A Tree is a non-linear hierarchical data structure. A Binary Search Tree (BST) enforces an ordering property: for any node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly greater.',
    conceptWhy: 'BST provides logarithmic search, insertion, and deletion O(log n) on average. Self-balancing variations like AVL Trees and Red-Black Trees maintain this O(log n) worst-case efficiency.',
    timeComplexity: {
      access: 'O(log n) avg, O(n) worst',
      search: 'O(log n) avg, O(n) worst',
      insertion: 'O(log n) avg, O(n) worst',
      deletion: 'O(log n) avg, O(n) worst'
    },
    video: {
      title: 'Binary Search Tree (BST) Construction & Traversals in C',
      url: 'https://www.youtube.com/embed/gcULXE7ViZw',
      duration: '22 mins',
      transcriptHighlights: [
        '00:00 - Tree hierarchy: Root, Edge, Parent, Child, Leaf',
        '05:00 - Binary Search Tree property',
        '10:30 - Recursive Inorder, Preorder, Postorder traversals',
        '16:00 - Why Inorder traversal of BST yields sorted values'
      ]
    },
    materials: {
      notesSummary: 'Unit-3 Tree & Balanced Trees (AVL, Heaps) Anna University Syllabus.',
      bulletPoints: [
        'Height of a tree is length of the longest path from root to a leaf.',
        'Inorder traversal: Left -> Root -> Right (produces sorted order in BST).',
        'Preorder: Root -> Left -> Right (useful for serialization).',
        'Postorder: Left -> Right -> Root (useful for deleting tree from leaves upward).'
      ],
      keyTakeaways: ['Hierarchical organization', 'Inorder traversal produces sorted output']
    },
    conceptualExplanation: {
      theory: `BST Structure:
        50
       /  \\
      30   70
     /  \\    \\
    20  40    80

Left of 50 contains {20, 30, 40} < 50.
Right of 50 contains {70, 80} > 50.`,
      memoryModelDiagram: `        [ 50 ]
       /      \\
    [ 30 ]   [ 70 ]`,
      stepByStepFlow: [
        'Insert: If key < root->data, recurse left; else recurse right.',
        'Base case: when current node is NULL, create and return new node.'
      ]
    },
    cProgramImplementation: {
      description: 'BST insertion and Inorder Traversal in C.',
      structDefinition: `struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};`,
      coreFunctions: [
        {
          name: 'insertBST',
          description: 'Recursively inserts value into BST.',
          codeSnippet: `struct TreeNode* insert(struct TreeNode* node, int key) {
    if (node == NULL) {
        struct TreeNode* temp = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        temp->data = key;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (key < node->data) node->left = insert(node->left, key);
    else if (key > node->data) node->right = insert(node->right, key);
    return node;
}`
        }
      ],
      fullCode: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left, *right;
};

struct TreeNode* insert(struct TreeNode* node, int key) {
    if (node == NULL) {
        struct TreeNode* t = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        t->data = key;
        t->left = t->right = NULL;
        return t;
    }
    if (key < node->data) node->left = insert(node->left, key);
    else node->right = insert(node->right, key);
    return node;
}

void inorder(struct TreeNode* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    struct TreeNode* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    inorder(root);
    printf("\\n");
    return 0;
}`
    },
    mcqs: [
      {
        id: 'tree-q1',
        question: 'Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        correctIndex: 1,
        explanation: 'Inorder traversal visits (Left, Root, Right), which for a BST guarantees ascending sorted sequence.'
      }
    ],
    implementationVideo: {
      title: 'BST C Implementation and Visualizer',
      duration: '20 mins',
      walkthroughSteps: ['Recursive insertion', 'Inorder traversal logic']
    },
    exampleExplanation: {
      scenario: 'Fast phone directory search organized as a balanced tree.',
      fullCodeWithComments: `// BST phone book lookup`,
      lineByLineExplanation: [{ lines: '1-10', note: 'Tree node definition' }]
    },
    codingAssessment: {
      id: 'code-bst-inorder',
      title: 'BST Inorder Traversal (Sorted Output)',
      difficulty: 'Medium',
      problemStatement: 'Read N integers, insert each into a Binary Search Tree, and print the Inorder traversal of the tree.',
      inputFormat: 'Line 1: N\nLine 2: N space-separated integers.',
      outputFormat: 'Inorder traversal numbers separated by spaces.',
      constraints: '1 <= N <= 50',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* insert(struct Node* node, int val) {
    if (!node) {
        struct Node* n = (struct Node*)malloc(sizeof(struct Node));
        n->data = val;
        n->left = n->right = NULL;
        return n;
    }
    if (val < node->data) node->left = insert(node->left, val);
    else node->right = insert(node->right, val);
    return node;
}

void inorder(struct Node* root) {
    if (root) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    int n, val;
    if (scanf("%d", &n) != 1) return 0;
    struct Node* root = NULL;
    for(int i = 0; i < n; i++) {
        scanf("%d", &val);
        root = insert(root, val);
    }
    inorder(root);
    printf("\\n");
    return 0;
}`,
      solutionReference: `// Complete BST insertion & inorder`,
      testCases: [
        {
          id: 'tree-tc1',
          description: 'Basic 4 node tree',
          input: '4\n40 20 60 10',
          expectedOutput: '10 20 40 60'
        },
        {
          id: 'tree-tc2',
          description: 'Already sorted input',
          input: '3\n5 10 15',
          expectedOutput: '5 10 15'
        }
      ]
    }
  },
  {
    id: 'graph-ds',
    category: 'graph',
    categoryTitle: 'Graph',
    title: 'Graphs & Traversals (BFS / DFS)',
    subvariety: 'Directed, Undirected, Weighted, Adj Matrix, Adj List',
    summary: 'A non-linear data structure consisting of a set of vertices (nodes) and edges connecting pairs of vertices.',
    conceptWhat: 'A Graph G = (V, E) is composed of a finite set of vertices V and a collection of edges E. Graphs can be directed (arrows) or undirected, weighted (costs on edges) or unweighted.',
    conceptWhy: 'Graphs model networks: social connections, Google Maps road networks, internet packet routing, dependency resolution in package managers, and AI pathfinding.',
    timeComplexity: {
      access: 'O(V + E)',
      search: 'O(V + E) for BFS / DFS',
      insertion: 'O(1) for adding vertex/edge in Adj list',
      deletion: 'O(V + E)'
    },
    video: {
      title: 'Graph Representation: Adjacency Matrix vs List in C',
      url: 'https://www.youtube.com/embed/bSZ57h7U24U',
      duration: '25 mins',
      transcriptHighlights: [
        '00:00 - Vertices, Edges, Degrees',
        '06:00 - Adjacency Matrix: 2D array trade-offs',
        '12:00 - Adjacency List: array of linked lists',
        '18:00 - Breadth-First Search (BFS) using queue',
        '21:30 - Depth-First Search (DFS) using recursion/stack'
      ]
    },
    materials: {
      notesSummary: 'Unit-4 Graph Representations & Algorithms (Anna University 2025 Regulation).',
      bulletPoints: [
        'Adjacency Matrix uses O(V^2) memory; ideal for dense graphs.',
        'Adjacency List uses O(V + E) memory; optimal for sparse graphs.',
        'BFS uses a Queue to explore neighbors level-by-level (finds shortest unweighted path).',
        'DFS uses recursion / Stack to explore along branches as deep as possible.'
      ],
      keyTakeaways: ['Non-linear network modeling', 'BFS for shortest hop, DFS for cycle detection']
    },
    conceptualExplanation: {
      theory: `Undirected Graph:
  0 ---- 1
  |    /
  |  /
  2

Adj Matrix (3x3):
  0 1 2
0 0 1 1
1 1 0 1
2 1 1 0`,
      memoryModelDiagram: `Matrix representation:
M[0][1] = 1, M[1][0] = 1
M[0][2] = 1, M[2][0] = 1
M[1][2] = 1, M[2][1] = 1`,
      stepByStepFlow: [
        'Initialize V x V matrix with zeros.',
        'For each edge (u, v): set M[u][v] = 1; if undirected, M[v][u] = 1.'
      ]
    },
    cProgramImplementation: {
      description: 'Adjacency Matrix representation and edge addition in C.',
      structDefinition: `#define V 5
int adjMatrix[V][V];`,
      coreFunctions: [
        {
          name: 'addEdge',
          description: 'Adds an edge between vertex u and v',
          codeSnippet: `void addEdge(int u, int v) {
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1; // for undirected graph
}`
        }
      ],
      fullCode: `#include <stdio.h>
#define MAX 10

int adj[MAX][MAX];

void addEdge(int u, int v) {
    adj[u][v] = 1;
    adj[v][u] = 1;
}

int main() {
    int v = 3;
    addEdge(0, 1);
    addEdge(1, 2);
    for(int i = 0; i < v; i++) {
        for(int j = 0; j < v; j++) {
            printf("%d ", adj[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`
    },
    mcqs: [
      {
        id: 'grp-q1',
        question: 'What is the space complexity of an Adjacency Matrix representation for a graph with V vertices?',
        options: ['O(V)', 'O(V^2)', 'O(V + E)', 'O(E^2)'],
        correctIndex: 1,
        explanation: 'An adjacency matrix allocates a 2D array of dimensions V x V, consuming O(V^2) space.'
      }
    ],
    implementationVideo: {
      title: 'BFS and DFS Traversal Coding in C',
      duration: '22 mins',
      walkthroughSteps: ['Creating visited array', 'Queue for BFS', 'Recursive DFS']
    },
    exampleExplanation: {
      scenario: 'City roadmap connections between intersections.',
      fullCodeWithComments: `// Graph roadmap matrix`,
      lineByLineExplanation: [{ lines: '1-5', note: 'Adjacency matrix initialization' }]
    },
    codingAssessment: {
      id: 'code-graph-degree',
      title: 'Calculate Vertex Degree in Undirected Graph',
      difficulty: 'Easy',
      problemStatement: 'Given number of vertices V and number of edges E, followed by E pairs of connected vertices, calculate and print the degree of each vertex from 0 to V-1.',
      inputFormat: 'Line 1: V E\nNext E lines: u v (edges)',
      outputFormat: 'Space-separated degrees for vertices 0 through V-1.',
      constraints: '1 <= V <= 50, 0 <= E <= 200',
      starterCode: `#include <stdio.h>

int main() {
    int v, e;
    if (scanf("%d %d", &v, &e) != 2) return 0;
    int degree[100] = {0};
    for(int i = 0; i < e; i++) {
        int u, w;
        scanf("%d %d", &u, &w);
        degree[u]++;
        degree[w]++;
    }
    for(int i = 0; i < v; i++) {
        printf("%d ", degree[i]);
    }
    printf("\\n");
    return 0;
}`,
      solutionReference: `// Degree calculator`,
      testCases: [
        {
          id: 'grp-tc1',
          description: 'Triangle graph (3 vertices, 3 edges)',
          input: '3 3\n0 1\n1 2\n0 2',
          expectedOutput: '2 2 2'
        },
        {
          id: 'grp-tc2',
          description: 'Line graph (3 vertices, 2 edges)',
          input: '3 2\n0 1\n1 2',
          expectedOutput: '1 2 1'
        }
      ]
    }
  }
];

/**
 * Sequential Progression Rules:
 * A student MUST complete the previous module in order to unlock and access the next module.
 */
export const DS_MODULE_ORDER: string[] = [
  'singly-linked-list',
  'stack-ds',
  'queue-ds',
  'tree-ds',
  'graph-ds'
];

export function isDSTopicUnlocked(topicId: string, progress: UserProgress): boolean {
  if (topicId === 'doubly-linked-list') {
    return progress.completedDSTopicIds.includes('singly-linked-list');
  }
  const index = DS_MODULE_ORDER.indexOf(topicId);
  if (index <= 0) return true; // First module is unlocked
  const prevTopicId = DS_MODULE_ORDER[index - 1];
  return progress.completedDSTopicIds.includes(prevTopicId);
}

export function getPrerequisiteTopic(topicId: string): DSTopic | null {
  if (topicId === 'doubly-linked-list') {
    return DS_TOPICS.find(t => t.id === 'singly-linked-list') || null;
  }
  const index = DS_MODULE_ORDER.indexOf(topicId);
  if (index <= 0) return null;
  const prevTopicId = DS_MODULE_ORDER[index - 1];
  return DS_TOPICS.find(t => t.id === prevTopicId) || null;
}

export function isCFundamentalLessonUnlocked(lessonId: string, progress: UserProgress): boolean {
  const index = C_FUNDAMENTALS_LESSONS.findIndex(l => l.id === lessonId);
  if (index <= 0) return true; // First lesson is unlocked
  const prevLesson = C_FUNDAMENTALS_LESSONS[index - 1];
  return progress.completedCFundamentalLessonIds.includes(prevLesson.id);
}

export function getPrerequisiteLesson(lessonId: string): CFundamentalLesson | null {
  const index = C_FUNDAMENTALS_LESSONS.findIndex(l => l.id === lessonId);
  if (index <= 0) return null;
  return C_FUNDAMENTALS_LESSONS[index - 1] || null;
}
