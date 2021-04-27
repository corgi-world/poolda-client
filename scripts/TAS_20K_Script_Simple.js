export const MaxLevel = 5;
export const EndLevel = 7;

export const MessageScript = {
  0: [
    "@@님의 감정 표현 정도를 더 정확하게 알려줄 수 있는 테스트에요",
    "총 23개의 문항으로 이루어져 있어요.",
    "테스트 해보시겠어요?"
  ],
  1: [
    "1. @@님이 어떤 감정을 느끼고 있는지 자주 혼동하시나요?"
  ],
  2: [
    "2. @@님의 기분(감정)을 적절한 말로 표현하는 것이 어려우신가요?"
  ],
  3: [
    "3. 의사들조차도 이해하지 못하는 신체적인 감각을 느끼신 적이 있나요?"
  ],
  4: [
    "4. @@님의 기분을 쉽게 말로 표현하실 수 있나요?"
  ],
  5: [
    "5. @@님이 겪는 문제들을 표면적으로 보고 넘기기 보다는 꼼꼼하게 분석하고 짚고 넘어가는 것을 더 좋아하시나요?"
  ],
  6: [
    "수고하셨어요! 검사가 끝났어요.",
    "😎분석중 😎"
  ],
  7: ["네 그럼 다음에 봬요!"]
};

export const BlockScript = {
  0: ["응"],
  1: [
    "전혀 혼동하지 않아요",
    "혼동하지 않아요",
    "가끔 그래요",
    "종종 혼동해요",
    "매우 혼동해요"
  ],
  2: [
    "전혀 어렵지 않아요",
    "어렵지 않아요",
    "가끔 어려워요",
    "종종 어려워요",
    "매우 어려워요"
  ],
  3: [
    "전혀 그런 적 없어요",
    "그런 적 없는 것 같아요",
    "가끔 그래요",
    "자주 그래요",
    "매 번 그래요"
  ],
  4: [
    "매우 잘해요",
    "잘해요",
    "보통이에요",
    "잘 못해요",
    "전혀 못해요"
  ],
  5: [
    "꼭 짚고 넘어가야 해요",
    "짚고 넘어가는 것을 좋아해요",
    "반반 이에요",
    "보고 넘기는 걸 좋아해요",
    "항상 보고 넘겨요"
  ],
  6: ["풀고래랑 대화하기", "다음에 할래"]
};

export const MessageDelay = {
  0: [500, 1000, 1000],
  1: [1000],
  2: [1000],
  3: [1000],
  4: [1000],
  5: [1000],
  6: [1000, 1000, 2000, 2000],
  7: [1000]
};