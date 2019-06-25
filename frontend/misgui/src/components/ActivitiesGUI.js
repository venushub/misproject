import React, {Component} from 'react'



class ActivitiesGUI extends Component {

    constructor(props){
        super(props)
        let mytheme = localStorage.getItem('theme');

        this.state = {
          extradark : "rgb(40,55,71)",
          dark : "rgb(52,73,71)",
          light : "rgb(174,182,191)",
          extralight : "rgb(235,237,239)",
          translight : "rgb(52,73,71,0.3)"
        }


        if(mytheme === "green") {

          console.log("greeeen")

          this.state = {
            extradark : "rgb(25,111,61)",
            dark : "rgb(34, 153, 84)",
            light : "rgb(169, 223,191)",
            extralight : "rgb(233, 247, 239)",
            translight : "rgb(34, 153, 84,0.3)"
          }

        } else if (mytheme === "blue") {
          this.state = {
            extradark : "rgb(40,55,71)",
            dark : "rgb(52,73,71)",
            light : "rgb(174,182,191)",
            extralight : "rgb(235,237,239)",
            translight : "rgb(52,73,71,0.3)"
          }
        } else if (mytheme === "red") {
          this.state = {
            extradark : "rgb(146, 43, 33)",
            dark : "rgb(192, 57, 43)",
            light : "rgb(230, 176, 170)",
            extralight : "rgb(249, 235, 234)",
            translight : "rgb(192, 57, 43, 0.3)"
          }
        } else if (mytheme === "yellow") {
          this.state = {
            extradark : "rgb(154, 125, 10)",
            dark : "rgb(212, 172, 13)",
            light : "rgb(249, 231, 159)",
            extralight : "rgb(254, 249, 231)",
            translight : "rgb(212, 172, 13, 0.3)"
          }
        }
    }


    componentDidMount() {



      let mytheme = localStorage.getItem('theme');
      if(mytheme==="blue"){


      this.setState({
        extradark : "rgb(40,55,71)",
        dark : "rgb(52,73,71)",
        light : "rgb(174,182,191)",
        extralight : "rgb(235,237,239)",
        translight : "rgb(52,73,71,0.3)"
      })

    } else if(mytheme === "green") {

      console.log("greeeen")

      this.setState({
        extradark : "rgb(25,111,61)",
        dark : "rgb(34, 153, 84)",
        light : "rgb(169, 223,191)",
        extralight : "rgb(233, 247, 239)",
        translight : "rgb(34, 153, 84,0.3)"
      })

    } else if (mytheme === "red") {

      this.setState({
        extradark : "rgb(146, 43, 33)",
        dark : "rgb(192, 57, 43)",
        light : "rgb(230, 176, 170)",
        extralight : "rgb(249, 235, 234)",
        translight : "rgb(192, 57, 43, 0.3)"
      })

    } else if (mytheme === "yellow") {

      this.setState({
        extradark : "rgb(154, 125, 10)",
        dark : "rgb(212, 172, 13)",
        light : "rgb(249, 231, 159)",
        extralight : "rgb(254, 249, 231)",
        translight : "rgb(212, 172, 13, 0.3)"
      })

    }


        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        let t = 0.3;

        let h = 8;

        let col = this.state.translight;


        ctx.fillStyle = this.state.light
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const activities = this.props.activities_gui  &&  this.props.activities_gui != undefined ? this.props.activities_gui : []

        // console.log("aaaaaaaaa", activities)

        activities.map((activity) => {

            let startTime = ((parseFloat(activity.activityStartTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityStartTime.toString().substring(14,16)))/2)
            let endTime = ((parseFloat(activity.activityEndTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityEndTime.toString().substring(14,16)))/2)


            // console.log("ddddddlllllll", startTime)
            // console.log("ddddddlllllll", endTime)

            let length = endTime - startTime

            // console.log("length", length)



            ctx.fillStyle = col;
            ctx.fillRect(startTime, h, length , 30 );

            if(this.props.aid === activity.id){
                ctx.strokeStyle = this.state.dark;
                ctx.lineWidth = 2;
                ctx.strokeRect(startTime, h, length, 30);
                // console.log("haaaaaa")
            }

            if(h === 8){
                h = 10
            } else {
                h = 8
            }

            return null;
        })





    }


    componentDidUpdate(prevProps){

        if (this.props.activities_gui !== prevProps.activities_gui) {
          let mytheme = localStorage.getItem('theme');
          if(mytheme==="blue"){


          this.setState({
            extradark : "rgb(40,55,71)",
            dark : "rgb(52,73,71)",
            light : "rgb(174,182,191)",
            extralight : "rgb(235,237,239)",
            translight : "rgb(52,73,71,0.3)"
          })

        } else if(mytheme === "green") {

          console.log("greeeen")

          this.setState({
            extradark : "rgb(25,111,61)",
            dark : "rgb(34, 153, 84)",
            light : "rgb(169, 223,191)",
            extralight : "rgb(233, 247, 239)",
            translight : "rgb(34, 153, 84,0.3)"
          })

        } else if (mytheme === "red") {

          this.setState({
            extradark : "rgb(146, 43, 33)",
            dark : "rgb(192, 57, 43)",
            light : "rgb(230, 176, 170)",
            extralight : "rgb(249, 235, 234)",
            translight : "rgb(192, 57, 43, 0.3)"
          })

        } else if (mytheme === "yellow") {

          this.setState({
            extradark : "rgb(154, 125, 10)",
            dark : "rgb(212, 172, 13)",
            light : "rgb(249, 231, 159)",
            extralight : "rgb(254, 249, 231)",
            translight : "rgb(212, 172, 13, 0.3)"
          })

        }


        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        let t = 0.3;


        let h = 8;

        let col = this.state.translight;

        ctx.fillStyle = this.state.light
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const activities = this.props.activities_gui  &&  this.props.activities_gui != undefined ? this.props.activities_gui : []

        // console.log("aaaaaaaaa", activities)

        activities.map((activity) => {

            let startTime = ((parseFloat(activity.activityStartTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityStartTime.toString().substring(14,16)))/2)
            let endTime = ((parseFloat(activity.activityEndTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityEndTime.toString().substring(14,16)))/2)


            // console.log("ddddddlllllll", startTime)
            // console.log("ddddddlllllll", endTime)

            let length = endTime - startTime


            // console.log("length", length)

            ctx.fillStyle = col;

            ctx.fillRect(startTime, h, length , 30 );
            if(this.props.aid === activity.id){

              ctx.strokeStyle = this.state.dark;
              ctx.lineWidth = 2;
              ctx.strokeRect(startTime, h, length, 30);
                // console.log("haaaaaa")
            }

            if(h === 8){
                h = 10
            } else {
                h = 8
            }


            return null;
        })




        }

    }



    render(){
        return(
            <div className="canvas-div">
                <canvas  ref="canvas" width={730} height={50} />
            </div>
        )
    }
}



export default ActivitiesGUI
