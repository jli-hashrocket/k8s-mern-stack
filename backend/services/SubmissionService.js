const parser = require('xml2json');

class SubmissionService {
  constructor(url) {
    this.url = url
  }

  importData() {
    fetch(this.url, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml'
      }
    })
    .then(res => {
      var json = parser.toJson(res.body);
  
      if (!res.ok) {
          const error = (data && data.message) || res.status;
          return Promise.reject(error);
      }
      data.then(d => {
        return d;
      })
      
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = SubmissionService;
