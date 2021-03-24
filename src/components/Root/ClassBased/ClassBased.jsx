import React from 'react'
import s from '../Explorer.module.css'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import { Search } from '@material-ui/icons'
import Preloader from '../../Preloader/Preloader'

class ClassBased extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      gifs: [],
      isFetching: false,
    }
  }

  handleQueryChange = e => {
    this.setState({ query: e.target.value })
  }

  getGifs = async () => {
    this.setState({ isFetching: true })

    let data = await this.props.requestData(this.state.query)
    this.setState({
      gifs: data,
      isFetching: false,
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.query) this.getGifs()
  }

  render() {
    return (
      <div className={s.container}>
        <h2>Class based</h2>
        <div className={s.search}>
          <TextField
            size={'small'}
            label={'Search'}
            value={this.state.query}
            onKeyUp={this.handleKeyPress}
            onChange={this.handleQueryChange}
          />
          <IconButton
            disabled={!this.state.query}
            size={'small'}
            onClick={this.getGifs}
          >
            <Search />
          </IconButton>
        </div>
        {this.state.isFetching ? (
          <Preloader />
        ) : (
          <div className={s.gifs}>
            {this.state.gifs.map(g => (
              <img
                key={g.id}
                className={s.img}
                src={g.images.fixed_height.url}
                alt={'gif'}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default ClassBased
