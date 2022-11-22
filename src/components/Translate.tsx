import { useEffect, useState } from 'react';
import axios from "axios"
import languagesData from "../../public/languages.json"
// const axios = require('axios');

export const Translate = () => {

  const [languages, setLanguages] = useState(languagesData);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');


  
  // useEffect(() => {
  //   (async () => {
      
  //     /* const response = (await axios.get(`https://api.mymemory.translated.net/get?q=${input}!&langpair=${from}|${to}`)).data.matches
      
  //     // const _input = response[0].segment
  //     .then((response) => {
  //       const _output = response[0].translation
  //       setOutput(_output)
  //     })
      
  //     // console.log(_output)
  //     // setInput(_input) */
      
    
  //   // Make a request for a user with a given ID
  //   axios.get(`https://api.mymemory.translated.net/get?q=hello!&langpair=en|de`)
  //     .then(function (response) {
  //       // handle success
  //       console.log(response.data.matches)
  //       setOutput(response.data.matches[0].tranlation)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // setOutput(response)
  //     });
  //   })()
  // }, [])
  const translateBtn = () => {


    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      setOutput(res.data.translatedText)
    })

  };

  return (

    <>
      <div className='transition'>
        From `{from}` :
        <select onChange={(e) => setFrom(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        To `{to}` :
        <select onChange={(e) => setTo(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="45"
          rows="10"
          onInput={(e: any) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea readOnly cols="45" rows="10" value={output}></textarea>
      </div>
      <div>
        <button onClick={e => translateBtn()}><a>Translate</a></button>
      </div>
    </>
  )
}