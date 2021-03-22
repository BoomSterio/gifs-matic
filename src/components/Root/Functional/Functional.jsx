import React, {useState} from 'react'
import s from '../Explorer.module.css'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import {Search} from '@material-ui/icons'
import Preloader from '../../Preloader/Preloader'

const Functional = ({requestData}) => {
    const [gifs, setGifs] = useState([])
    const [query, setQuery] = useState('')
    const [isFetching, setIsFetching] = useState(false)

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const getGifs = async () => {
        setIsFetching(true)

        let data = await requestData(query)
        setGifs(data)

        setIsFetching(false)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && query)
            getGifs()
    }

    return (
        <div className={s.container}>
            <h2>Functional</h2>
            <div className={s.search}>
                <TextField
                    size={'small'} label={'Search'} value={query}
                    onKeyUp={handleKeyPress} onChange={handleQueryChange}
                />
                <IconButton disabled={!query} size={'small'} onClick={getGifs}><Search/></IconButton>
            </div>
            {isFetching ?
                <Preloader/>
                :
                <div className={s.gifs}>
                    {gifs.map((g, i) => <img key={i} className={s.img}
                                                        src={g.images.fixed_height.url} alt={'gif'}/>)}
                </div>}
        </div>
    )
}

export default Functional