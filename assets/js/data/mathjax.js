---
layout: compress
# WARNING: Don't use '//' to comment out code, use '{% comment %}' and '{% endcomment %}' instead.
---

{%- comment -%}
  See: <https://docs.mathjax.org/en/latest/options/input/tex.html#tex-options>
{%- endcomment -%}

MathJax = {
  tex: {
    {%- comment -%} start/end delimiter pairs for in-line math {%- endcomment -%}
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    {%- comment -%} start/end delimiter pairs for display math {%- endcomment -%}
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    {%- comment -%} equation numbering {%- endcomment -%}
    tags: 'ams'
  },
    options: {
    /* 이 부분이 핵심입니다! */
    enableAssistiveMml: true, // 복사 시 구조화된 텍스트(MathML)를 제공
    menuOptions: {
      settings: {
        assistiveMml: true
      }
    }
  },
  loader: {
    load: ['ui/menu', 'output/chtml']
  }
};
