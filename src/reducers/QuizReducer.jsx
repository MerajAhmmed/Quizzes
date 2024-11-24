import { actions } from "../actions";

const initialState = {
  user: null,
  quiz: [],
  loading: false,
  error: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case actions.quiz.QUIZ_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.quiz.QUIZ_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        quiz: action.data.quizs,
      };
    }

    case actions.quiz.QUIZ_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.quiz.QUIZ_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    case actions.quiz.QUIZ_DELETED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    default: {
      return state;
    }
  }
};
export { initialState, quizReducer };
