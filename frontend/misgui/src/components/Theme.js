import React , {Component} from 'react'



class Theme extends Component {

  constructor(props){
    super(props)

    this.state = {
      themes : [
        {id : 1, color : "red", active : false},
        {id : 2, color : "blue", active : false},
        {id : 3, color : "green", active : false},
        {id : 4, color : "yellow", active : false},
      ],
    }
  }

  componentDidMount(){
    let mytheme = localStorage.getItem('theme');

    let oldthemes = this.state.themes
    let newthemes = []
    oldthemes.map(
      (theme) => {
        if(theme.color === mytheme){
          newthemes.push({id : theme.id, color : theme.color, active : true})
        }
     else {
        newthemes.push({id : theme.id, color : theme.color, active : false})
      }
        }
    )
    this.setState({
      themes : newthemes
    })

  }

  handleThemeChange = (inTheme) => {
    console.log("theme you wantaa", inTheme.id)
    let oldthemes = this.state.themes
    let newthemes = []
    oldthemes.map(
      (theme) => {
        if(theme.id === inTheme.id){
          newthemes.push({id : theme.id, color : theme.color, active : true})
        }
     else {
        newthemes.push({id : theme.id, color : theme.color, active : false})
      }
        }
    )
    this.setState({
      themes : newthemes
    })
    localStorage.setItem('theme', inTheme.color)
    window.location.reload()
  }



  render(){

    console.log(this.state.current)

    let color_svgs = [];

    this.state.themes.map(
      (theme, index) => {
        if(theme.active) {
           color_svgs.push(<circle onClick = {() => this.handleThemeChange(theme)} cx={(index*40)+(20*(index+2))} cy="25" r="20" fill={theme.color}  stroke="grey" stroke-width="3" />)
        } else {
          color_svgs.push(<circle onClick = {() => this.handleThemeChange(theme)}  cx={(index*40)+(20*(index+2))} cy="25" r="20" fill={theme.color}  />)
        }
        return null;
      }
    )


    return(
      <div className="flex-this-row margin-top-2em">
        <div className="choose-theme">Choose a Theme</div>
        <div>
          <svg width="500" height="50">
             {color_svgs}
          </svg>
        </div>
      </div>
    )

  }


}

export default Theme
