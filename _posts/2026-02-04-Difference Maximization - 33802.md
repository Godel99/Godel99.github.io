---
title: "[Gold IV] Difference Maximization - 33802"
date: 2026-02-04
categories: [PS, BOJ] # BOJ, Programmers
tags: [수학, 그리디 알고리즘, 누적 합]
---
[문제 링크](https://www.acmicpc.net/problem/33802) 

## **풀이**
### 접근
실력을 알 수 없는 학생에게 $1$ 이상 $M$ 이하 값을 정해줘야 합니다. 학생 간의 실력 차(**친밀도**)의 절댓값을 누적해 최댓값을 구하는 것입니다. 

절댓값이므로 볼록함수 형태를 띠게 됩니다. 즉, 볼록함수는 V자 모양의 그래프이므로 블록 함수의 최댓값은 처음 시작과 끝에 있다는 점을 알 수 있습니다. 그러므로 $1$ 이상 $M$ 이하 값에서 $1$ 또는 $M$의 값을 실력을 알 수 없는 학생에게 배정해야 실력 차의 절댓값의 누적 합의 최대가 될 수 있습니다.

### 친밀도 누적합
브루트 포스처럼 일일이 차의 합을 누적해 간다면 복잡도는 $\mathcal{O}(N^2)$가 되지만, 각 실력마다 학생 수를 세서 (실력이 $i$이하인 학생 수)$\times$(실력이 $i+1$ 이상인 학생 수)를 통해 수 배열과 곱셈을 이용한다면 $\mathcal{O}(N+M)$만에 계산을 할 수 있습니다.

### 그리디
블록 함수의 특성상 $1$ 또는 $M$에서 최대가 된다는 점을 알 수 있습니다. 실력을 모르는 학생을 추가할 때마다 $1$ 또는 $M$ 일 때를 비교해 큰 쪽을 선택해 업데이트를 해주면 **그리디**하게 최선을 유지할 수 있습니다.

## **구현**
<details markdown="1">
<summary>코드</summary>

```python
import sys
def print(*args, sep=" ", end="\n"): return sys.stdout.write(sep.join(map(str, args)) + end)
def input(): return sys.stdin.readline().rstrip()

def main():
    n, m = map(int, input().split())
    A = [0]*(m+1); dmin = dmax = ans = 0
    for a in list(map(int, input().split())):
        if a:
            dmin += a-1
            dmax += m-a
        A[a] += 1
    s = 0
    for i in range(1, m):
        s += A[i]
        ans += s*(n-A[0]-s)
    while A[0]:
        if dmin < dmax:
            dmin += m-1
            ans += dmax
        else:
            dmax += m-1
            ans += dmin
        A[0] -= 1
    print(ans)
    return 0
if __name__ == '__main__':
    sys.exit(main())
```
```c++
#include<bits/stdc++.h>
using namespace std;
using ll = long long;

int main(){
    cin.tie(0); cout.tie(0); ios::sync_with_stdio(false);
    int n , m; cin >> n >> m;
    vector<ll> A(m+1, 0); ll dmin = 0, dmax = 0;
    for(int i = 1; i <= n; i++){
        int a; cin >> a;
        if(a){
            dmin += a-1;
            dmax += m-a;
        }
        A[a]++;
    }
    ll s = 0, ans = 0;
    for(int i = 1; i < m; i++){
        s += A[i];
        ans += s*(n-A[0]-s);
    }
    while(A[0]--){
        if(dmin < dmax){
            dmin += m-1;
            ans += dmax;
        }
        else{
            dmax += m-1;
            ans += dmin;
        }
    }
    cout << ans;
    return 0;
}
```
### 시간 및 공간 복잡도
* 시간복잡도: $\mathcal{O}(N + M)$
* 공간복잡도: $\mathcal{O}(M)$
