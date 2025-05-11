#include <iostream>
using namespace std;

// 1. Basic Integer Linked List
struct IntNode {
    int data;
    IntNode* next;
    
    IntNode(int val) : data(val), next(nullptr) {}
};

class IntLinkedList {
private:
    IntNode* head;
    
public:
    IntLinkedList() : head(nullptr) {}
    
    void insertAtEnd(int val) {
        IntNode* newNode = new IntNode(val);
        if (!head) {
            head = newNode;
            return;
        }
        
        IntNode* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    void display() {
        IntNode* current = head;
        while (current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    ~IntLinkedList() {
        while (head) {
            IntNode* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

// 2. Generic Linked List using Templates
template <typename T>
struct Node {
    T data;
    Node<T>* next;
    
    Node(T val) : data(val), next(nullptr) {}
};

template <typename T>
class LinkedList {
private:
    Node<T>* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void insertAtEnd(T val) {
        Node<T>* newNode = new Node<T>(val);
        if (!head) {
            head = newNode;
            return;
        }
        
        Node<T>* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    void display() {
        Node<T>* current = head;
        while (current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    ~LinkedList() {
        while (head) {
            Node<T>* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

// 3. Doubly Linked List
struct DoublyNode {
    int data;
    DoublyNode* prev;
    DoublyNode* next;
    
    DoublyNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};

class DoublyLinkedList {
private:
    DoublyNode* head;
    DoublyNode* tail;
    
public:
    DoublyLinkedList() : head(nullptr), tail(nullptr) {}
    
    void insertAtEnd(int val) {
        DoublyNode* newNode = new DoublyNode(val);
        if (!head) {
            head = tail = newNode;
            return;
        }
        
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
    
    void displayForward() {
        DoublyNode* current = head;
        while (current) {
            cout << current->data << " <-> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
    
    void displayBackward() {
        DoublyNode* current = tail;
        while (current) {
            cout << current->data << " <-> ";
            current = current->prev;
        }
        cout << "NULL" << endl;
    }
    
    ~DoublyLinkedList() {
        while (head) {
            DoublyNode* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    cout << "1. Integer Linked List Example:" << endl;
    IntLinkedList intList;
    intList.insertAtEnd(10);
    intList.insertAtEnd(20);
    intList.insertAtEnd(30);
    intList.display();
    
    cout << "\n2. Generic Linked List Example:" << endl;
    LinkedList<string> stringList;
    stringList.insertAtEnd("Hello");
    stringList.insertAtEnd("World");
    stringList.insertAtEnd("!");
    stringList.display();
    
    cout << "\n3. Doubly Linked List Example:" << endl;
    DoublyLinkedList dll;
    dll.insertAtEnd(1);
    dll.insertAtEnd(2);
    dll.insertAtEnd(3);
    cout << "Forward traversal: ";
    dll.displayForward();
    cout << "Backward traversal: ";
    dll.displayBackward();
    
    return 0;
} 