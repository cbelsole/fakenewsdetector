const ARTICLE = "@@ARTICLE";
const CREATE_ARTICLE_SUCCESS = `${ARTICLE}/CREATE_SUCCESS`;

const initialState = {
  article: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    default:
      return state;
  }
};

const createArticleSuccess = article => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: article
});

export const createArticle = url => {
  return dispatch => {
    return fetch(
      "/api/articles",
      { body: { url }, method: "POST" },
      {
        headers: {
          "content-type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(createArticleSuccess(json));
        return json;
      });
  };
};
