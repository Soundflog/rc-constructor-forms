import {IForm} from "../models/IForm";
import {QuestionType} from "../models/form/questionType.enum";

export const forms: IForm[] = [
  {
    id: 1,
    name: "Анкета 1",
    description: "Описание анкеты 1",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: [
      {
        id: 1,
        content: "QUESTION1",
        type: QuestionType.SINGLE_CHOICE,
        variants: [
          {
            id: 1,
            content: "Variant 1",
            score: 1.00
          },
        ]
      },
      {
        id: 2,
        content: "QUESTION2",
        type: QuestionType.SCALE,
        variants: [
          {
            id: 2,
            content: "Variant 2",
            score: 1.00
          },
          {
            id: 3,
            content: "Variant 3",
            score: 1.00
          },
        ]
      },
      {
        id: 3,
        content: "QUESTION3",
        type: QuestionType.MULTI_CHOICE,
        variants: [
          {
            id: 4,
            content: "Variant 4",
            score: 1.00
          },
          {
            id: 5,
            content: "Variant 5",
            score: 1.00
          },
          {
            id: 6,
            content: "Variant 6",
            score: 1.00
          }
        ]
      },
      {
        id: 4,
        content: "QUESTION4",
        type: QuestionType.MULTI_CHOICE,
        variants: [
          {
            id: 7,
            content: "Variant 7",
            score: 1.00
          },
          {
            id: 8,
            content: "Variant 8",
            score: 1.00
          },
          {
            id: 9,
            content: "Variant 9",
            score: 1.00
          },
          {
            id: 10,
            content: "Variant 10",
            score: 1.00
          }
        ]
      },
    ]
  },
  {
    id: 2,
    name: "Анкета 2",
    description: "Описание анкеты 2",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: []
  },
  {
    id: 3,
    name: "Анкета 3",
    description: "Описание анкеты 3",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: []
  },
  {
    id: 4,
    name: "Анкета 2",
    description: "Описание анкеты 2",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: []
  },
  {
    id: 5,
    name: "Анкета 3",
    description: "Описание анкеты 3",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: []
  },
  {
    id: 6,
    name: "Анкета 3 Анкета 3 Анкета 3 Анкета 3 Анкета 3 Анкета 3",
    description: "Описание анкеты 3 Описание анкеты 3 Описание анкеты 3 Описание анкеты 3Описание анкеты 3 Описание анкеты 3 Описание анкеты 3 Описание анкеты 3Описание анкеты 3",
    scale_id: {
      id: 1,
      name: "scale name",
      description: "description scale name"
    },
    questions: []
  }
]
