import React, {Component} from 'react'



class GanttPoc extends Component {
  constructor(props){
    super(props)
    this.state={
      items : [
        {id : 1, name:"activityone", start : 10, length : 100, completed : 50, showSum : false},
        {id : 2, name:"activitytwo", start : 20, length : 80, completed : 50 , showSum : false}
      ],
      name : '',
      start : '',
      length : '',
      completed : ''
    }
  }


  handleHover = (inItem) => {

    console.log("inItem", inItem)
    let olditems = this.state.items
    let newitems = []
    olditems.map(
      (item) => {
        if(item.id === inItem.id){
          newitems.push({id : inItem.id, name:inItem.name, start : inItem.start, length : inItem.length, completed : inItem.completed, showSum : true})
        } else {
          newitems.push({id : item.id, name:item.name, start : item.start, length : item.length, completed : item.completed, showSum : false})
        }
        return null;
      }
    )
    this.setState({
      items : newitems
    })
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let itemshere = this.state.items

    itemshere.push({id : (itemshere.length+1), name:this.state.name, start : this.state.start, length : this.state.length, completed : this.state.completed, showSum : false})

    this.setState({
      items : itemshere
    })

  }

  handleInput = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }




  render(){

    console.log(this.state)

    let acts_svgs = []

    let acts_ren = this.state.items.map(
      (item) => {
        let myShow;
        if(item.showSum){
          myShow = <g>
            <rect x={parseInt(item.start)} y={((parseInt(item.id)*20)+(parseInt(item.id)*5))} width={parseInt(item.length)} height={20} fill="orange"/>
            <text fill="white" x={parseInt(item.start) + 5} y={((parseInt(item.id)*20)+(parseInt(item.id)*5))+ 15}>{item.name}</text>
          </g>
        }
        acts_svgs.push(<g key={item.id}>
          <rect   onClick={() => this.handleHover(item)} x={parseInt(item.start)} y={((parseInt(item.id)*20)+(parseInt(item.id)*5))} width={parseInt(item.length)} height={20} fill="#c11187" />
            {myShow}
          </g>
        )
      }
    )


    return(
      <div style={{width: "100%", display : "flex" ,justifyContent: "space-around", padding:"1em"}}>
        <svg width="1000" height="500">
           <rect  width="1000" height="500" fill="pink" />
           {acts_svgs}
        </svg>
        <form onSubmit={this.handleSubmit} style={{display : "flex" , flexDirection: "column", alignItems:"center" , padding:"1em", backgroundColor: "#fcf9fb"}}>

          <label  style={{display : "flex" , alignSelf:"flex-start",marginBottom:"5px", fontWeight:"bold", fontFamily:"verdana" }}>Name</label>
          <input style={{border: "1px solid #dddbdb", fontSize:"1.1em", marginBottom:"10px" }} type="text" name="name" onChange={this.handleInput} value={this.state.name} />

          <label  style={{display : "flex" , alignSelf:"flex-start",marginBottom:"5px", fontWeight:"bold", fontFamily:"verdana" }}>Start</label>
          <input style={{border: "1px solid #dddbdb", fontSize:"1.1em", marginBottom:"10px" }} type="text" name="start" onChange={this.handleInput} value={this.state.start} />

          <label  style={{display : "flex" , alignSelf:"flex-start",marginBottom:"5px", fontWeight:"bold", fontFamily:"verdana" }}>Length</label>
          <input style={{border: "1px solid #dddbdb", fontSize:"1.1em", marginBottom:"10px" }} type="text" name="length" onChange={this.handleInput} value={this.state.length} />

          <label  style={{display : "flex" , alignSelf:"flex-start",marginBottom:"5px", fontWeight:"bold", fontFamily:"verdana" }}>Completed</label>
          <input style={{border: "1px solid #dddbdb", fontSize:"1.1em", marginBottom:"10px" }} type="text" name="completed" onChange={this.handleInput} value={this.state.completed} />

          <button style={{display : "flex" , alignSelf:"flex-end",marginBottom:"5px", fontWeight:"bold", fontFamily:"verdana", border:"none", padding : "0.5em 1em 0.5em 1em", backgroundColor:"pink" }} >Add</button>

        </form>
      </div>
    )
  }
}

export default GanttPoc
