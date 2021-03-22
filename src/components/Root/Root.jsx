import React, {useState} from 'react'
import s from './Root.module.css'
import axios from 'axios'
import ClassBased from './ClassBased/ClassBased'
import Functional from './Functional/Functional'

const Root = () => {
    const [toRender, setToRender] = useState('')

    const requestData = (query) => {
        return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=${query}`)
            .then(res => res.data.data)
    }

    return (
        <div className={s.root}>
            <h1>GIFs-matic</h1>
            <div>
                <button className={s.button} value={'class'} onClick={() => setToRender('class')}>
                    Class Based
                </button>
                <button className={s.button} value={'func'} onClick={() => setToRender('func')}>
                    Functional
                </button>
            </div>
            <div>
                {toRender === 'class' ?
                    <ClassBased requestData={requestData}/>
                    : toRender === 'func' &&
                    <Functional requestData={requestData}/>}
            </div>
        </div>
    )
}

export default Root
