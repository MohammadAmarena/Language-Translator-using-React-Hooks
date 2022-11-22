import { useEffect, useState } from 'react';
import axios from "axios"
import languagesData from "../../public/languages.json"

export const Translate = () => {

  const [languages, setLanguages] = useState(languagesData);
  const [from, setFrom] = useState('en');
  const [to, setTo] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');


  const translateBtn = () => {
    
    (async () => {
  
      const response = (await axios.get(`https://api.mymemory.translated.net/get?q=${input}!&langpair=${from}|${to}`)).data.matches
      
      const _output = response[0].translation
      setOutput(_output)
    })()

    /* const params = new URLSearchParams();
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
    }) */

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
          onInput={(e: any) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea readOnly value={output}></textarea>
      </div>
      <div>
        <button onClick={e => translateBtn()}><a>Translate</a></button>
      </div>
    </>
  )
}