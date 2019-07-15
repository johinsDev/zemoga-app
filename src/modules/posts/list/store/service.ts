import api from '../../../../api'

function fetch(url: string) {
  return api()
    .get(url)
    .then(respose => {
      return respose
    })
    .catch(err => {
      console.log(err)
      return null
    })
}

export const postService = {
  fetch,
}
