---
title: "[Gold IV] Monster Path (Large) - 14307"
date: 2026-02-03
categories: [PS, BOJ] # BOJ, Programmers
tags: [브루트포스 알고리즘, 깊이 우선 탐색, 그래프 이론, 그래프 탐색, 수학, 확률론]
---
[문제 링크](https://www.acmicpc.net/problem/14307) 

## **풀이**
### 문제 요약
최적의 방법으로 $S$번 이동했을 때 잡을 수 있는 몬스터의 수의 최대 기대값(확률)을 구하라는 것입니다.

### 접근
**BFS와 백트래킹**을 이용해서 구현할 수도 있지만, 여러 가지 조건이 붙고 입력값이 크지 않아서 **브루트 포스**로도 충분히 해결이 가능합니다.

브루트 포스 시에도 백트래킹과 비슷하게 확률 배열을 복구해줘야 합니다.

### 완전 탐색
$S$가 10 이하이므로 $4^{10}=1,048,576$의 계산이면 시간 및 메모리 제한 내로 해결이 가능합니다. 시작점으로부터 $S$번 갈 수 있는 모든 경로에 대해서 확률을 더해갑시다. 만약 경계를 벗어나면 그 경우는 예외 처리를 해줍니다.

### 확률
어떤 위치에서 $p$ 확률로 몬스터를 잡을 수 있다고 가정하면, 그 위치에 다시 방문했을 때 몬스터를 잡을 확률은 $(1-p) \times p$가 됩니다. 왜냐면 몬스터를 한 번 잡으면 그곳에서 다시는 몬스터가 생기지 않기 때문에 다시 방문해서 몬스터를 잡을 확률은 이전에 몬스터를 잡지 못했을 확률에 그 위치의 원래 몬스터를 잡을 확률을 곱하는 것이기 때문입니다.

이렇게 확률을 구해 누적해 간다면, 정답을 구할 수 있습니다.

## **구현**
<details markdown="1">
<summary>코드</summary>

```python
import sys
def print(*args, sep=" ", end="\n"): return sys.stdout.write(sep.join(map(str, args)) + end)
def input(): return sys.stdin.readline().rstrip()

def main():
    T = int(input())
    def sv():
        r, c, sy, sx, s = map(int, input().split()); sy += 1; sx += 1
        p, q = map(float, input().split())
        board = [['']*(c+1) for _ in range(r+1)]
        d = [[0.0]*(c+1) for _ in range(r+1)]
        dy = (-1, 0, 1, 0); dx = (0, 1, 0, -1)
        for i in range(1, r+1):
            row = input().split()
            for j in range(1, c+1):
                board[i][j] = row[j-1]
                if board[i][j] == 'A': d[i][j] = p
                else: d[i][j] = q
        ans = 0
        for l in range(1<<(2*s)):
            y = sy; x = sx; sump = 0; flag = 1
            for i in range(s):
                k = (l>>(i*2))&3
                y += dy[k]; x += dx[k]
                if y < 1 or  y > r or x < 1 or x > c: flag = 0; continue
                sump += d[y][x]
                if board[y][x] == 'A': d[y][x] *= 1-p
                else: d[y][x] *= 1-q
            if flag: ans = max(ans, sump)
            y = sy; x = sx
            for i in range(s):
                k = (l>>(i*2))&3
                y += dy[k]; x += dx[k]
                if y < 1 or  y > r or x < 1 or x > c: continue
                if board[y][x] == 'A': d[y][x] = p
                else: d[y][x] = q
        return ans
    for i in range(1, T+1): print(f'Case #{i}: {sv():.12f}')
    return 0
if __name__ == '__main__':
    sys.exit(main())
```
```c++
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using ld = long double;
const int dy[] = {-1, 0, 1, 0}, dx[] = {0, 1, 0, -1};

char board[25][25];
ld d[25][25];

ld solved(){
    int r, c, sy, sx, s; cin >> r >> c >> sy >> sx >> s; sy++, sx++;
    ld p, q; cin >> p >> q;
    for(int i = 1; i <= r; i++) for(int j = 1; j <= c; j++){
        cin >> board[i][j];
        if(board[i][j] == 'A') d[i][j] = p;
        else d[i][j] = q; 
    }
    ld ans = 0;
    for(int l = 0; l < (1<<(2*s)); l++){
        int y = sy, x = sx; ld sump = 0; bool flag = 1;
        for(int i = 0; i < s; i++){
            int k = (l>>(i*2))&3;
            y += dy[k]; x += dx[k];
            if(y < 1 || y > r || x < 1 || x > c){
                flag = 0; continue;
            }
            sump += d[y][x];
            if(board[y][x] == 'A') d[y][x] *= 1-p;
            else d[y][x] *= 1-q;
        }
        if(flag) ans = max(ans, sump);
        y = sy, x = sx;
        for(int i = 0; i < s; i++){
            int k = (l>>(i*2))&3;
            y += dy[k]; x += dx[k];
            if(y < 1 || y > r || x < 1 || x > c) continue;
            sump += d[y][x];
            if(board[y][x] == 'A') d[y][x] = p;
            else d[y][x] = q;
        }
    }
    return ans;
}

int main(){
    cin.tie(0); cout.tie(0); ios::sync_with_stdio(false);
    int T; cin >> T; cout << fixed << setprecision(12);
    for(int i = 1; i <= T; i++) cout << "Case #" << i << ": " << solved() << '\n';
    return 0;
}
```
### 시간 및 공간 복잡도
* 시간복잡도: $\mathcal{O}(T \times (RC + 4^S \times S))$
* 공간복잡도: $\mathcal{O}(R \times C)$
