---
title: "[Gold III] Lost Civilization - 33803"
date: 2026-02-06
categories: [PS, BOJ] # BOJ, Programmers
tags: [그리디 알고리즘, 트리, 해 구성하기]
---
[문제 링크](https://www.acmicpc.net/problem/33803) 

## **풀이**
### 문제 요약
각 정점마다 요구되는 리프 노드까지 최소 거리가 주어집니다. 이를 만족하는 트리를 찾으세요.

### 접근
조건을 만족하는 트리를 모두 찾기 보다, 생각을 전환해 먼저 **최적의 조건**을 찾아봅시다. 최적의 조건이 성립이 되지 않는다면, 그 어떤 트리를 찾아도 그 트리는 조건을 성립하지 못합니다.

### 최적의 조건
문제에서 최적의 조건이란, **안정성**이 최대로 높은 트리입니다. 안정성이 높은 것이 가장 최적의 트리가 되는데, 그걸 만들어도 조건에 성립되지 않는다면 입력이 조건을 결코 만족할 수 없다는 것입니다. 그러므로 **안정성**이 최대인 트리를 먼저 구성해 봅시다.

### 직선형 트리
안정성이 최대인 트리는 리프 노드가 2개인 직선형 트리입니다. 그래야 $0, 1, 2, 3, \cdots, 3, 2, 1, 0$ 형식을 갖추며 가운데 값이 가장 높은 안정성을 띠게 되기 때문입니다. 

가운데 값이 가장 높은 안정성을 띠게 되는데, 그 조건이 성립하려면 2개의 노드가 필요하게 됩니다. 따라서 이를 일반화하면 $i$번째 노드가 가장 높은 안정성을 띠려면, $\left\lfloor \frac{i}{2} \right\rfloor$개의 노드가 양쪽에 위치해 줘야 하므로 $i$번째 수는 $\left\lfloor \frac{i}{2} \right\rfloor$ 이하여야 합니다.

### 정렬
직선형 트리 조건을 검사하기 전에 노드를 오름차순으로 정렬합니다. 그럼 $0,0,1,1,2,2, \cdots, n$ 같이 정렬이 될 테고 직선형 트리 조건이 성립한다면, 왼쪽 구간($0,1,2, \cdots$)과 오른쪽 구간($\cdots, 2,1,0$)을 나누고 중앙 노드($n$)로 연결을 해 줍니다.

## **구현**
<details markdown="1">
<summary>코드</summary>

```python
import sys
def print(*args, sep=" ", end="\n"): return sys.stdout.write(sep.join(map(str, args)) + end)
def input(): return sys.stdin.readline().rstrip()

def main():
    n = int(input())
    A = sorted([(a, i+1) for i, a in enumerate((map(int, input().split())))])
    for i in range(n): 
        if A[i][0] > i//2: return int(not print(-1))
    for i in range(0, n-2, 2): print(A[i][1], A[i+2][1])
    print(A[n-2][1], A[n-1][1])
    for i in range(n-2 if n%2 else n-1, 1, -2): print(A[i][1], A[i-2][1])
    return 0
if __name__ == '__main__':
    sys.exit(main())
```
```c++
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;

int main(){
    cin.tie(0); cout.tie(0); ios::sync_with_stdio(false);
    int n; cin >> n;
    vector<pii> A(n);
    for(int i = 1; i <= n; i++){
        int a; cin >> a; A.emplace_back(a, i);
    }
    sort(A.begin(), A.end());
    for(int i = 0; i < n; i++) if(A[i].first > i/2) return !(cout << -1);
    for(int i = 0; i < n-2; i+=2) cout << A[i].second << ' ' << A[i+2].second << '\n';
    cout << A[n-2].second << ' ' << A[n-1].second << '\n';
    for(int i = (n%2 ? n-2 : n-1); i >= 2; i-=2) cout << A[i].second << ' ' << A[i-2].second << '\n';
    return 0;
}
```
### 시간 및 공간 복잡도
* 시간복잡도: $\mathcal{O}(N \log N)$
* 공간복잡도: $\mathcal{O}(N)$
