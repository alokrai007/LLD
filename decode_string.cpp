#include <string>
#include <stack>
using namespace std;

string decodeString(string s) {
    int i, n = s.size();
    stack<string> st1;
    stack<int> st2;
    string cur;
    int num = 0;
    
    for(i = 0; i < n; i++) {
        // case for string
        if(s[i] >= 'a' && s[i] <= 'z') {
            cur += string(1, s[i]);
        }
        // case for number
        else if(s[i] >= '0' && s[i] <= '9') {
            num = num * 10 + (s[i] - '0');
        }
        // case for '['
        else if(s[i] == '[') {
            st1.push(cur);
            st2.push(num);
            cur = "";
            num = 0;
        }
        // case for ']'
        else if(s[i] == ']') {
            int repeat = st2.top();
            st2.pop();
            string temp = cur;
            for(int j = 1; j < repeat; j++) {
                cur += temp;
            }
            cur = st1.top() + cur;
            st1.pop();
        }
    }
    return cur;
} 