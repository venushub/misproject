import React, {Component} from 'react'



class ActivitiesGUI extends Component {

    constructor(props){
        super(props)
    }


    componentDidMount() {

        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        let t = 0.3;
      

        let h = 8;

        let col = "rgb(175, 73, 73, 0.3)";
   

        ctx.fillStyle = "#ffaaaa"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const activities = this.props.activities_gui  &&  this.props.activities_gui != undefined ? this.props.activities_gui : []

        console.log("aaaaaaaaa", activities)

        activities.map((activity) => {

            let startTime = ((parseFloat(activity.activityStartTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityStartTime.toString().substring(14,16)))/2)
            let endTime = ((parseFloat(activity.activityEndTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityEndTime.toString().substring(14,16)))/2)

            
            console.log("ddddddlllllll", startTime)
            console.log("ddddddlllllll", endTime)

            let length = endTime - startTime

            console.log("length", length)


            ctx.fillStyle = col;
            ctx.fillRect(startTime, h, length , 30 );

            if(this.props.aid === activity.id){

                ctx.strokeRect(startTime, h, length, 30);
                console.log("haaaaaa")
            }

            if(h === 8){
                h = 10
            } else {
                h = 8
            }

            if(col === "rgb(175, 73, 73, 0.3)"){
                col = "rgb(175, 73, 73, 0.7)"
            } else {
                col = "rgb(175, 73, 73, 0.3)"
            }


            return null;
        })



    }


    componentDidUpdate(prevProps){
    
        if (this.props.activities_gui !== prevProps.activities_gui) {

        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        let t = 0.3;
      

        let h = 8;

        let col = "rgb(175, 73, 73, 0.3)";
   

        ctx.fillStyle = "#ffaaaa"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const activities = this.props.activities_gui  &&  this.props.activities_gui != undefined ? this.props.activities_gui : []

        console.log("aaaaaaaaa", activities)

        activities.map((activity) => {

            let startTime = ((parseFloat(activity.activityStartTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityStartTime.toString().substring(14,16)))/2)
            let endTime = ((parseFloat(activity.activityEndTime.toString().substring(11,13))*60)/2) + ((parseFloat(activity.activityEndTime.toString().substring(14,16)))/2)

            
            console.log("ddddddlllllll", startTime)
            console.log("ddddddlllllll", endTime)

            let length = endTime - startTime


            console.log("length", length)

            ctx.fillStyle = col;

            ctx.fillRect(startTime, h, length , 30 );
            if(this.props.aid === activity.id){

                ctx.strokeRect(startTime, h, length, 30);
                console.log("haaaaaa")
            }

            if(h === 8){
                h = 10
            } else {
                h = 8
            }

            if(col === "rgb(175, 73, 73, 0.3)"){
                col = "rgb(175, 73, 73, 0.7)"
            } else {
                col = "rgb(175, 73, 73, 0.3)"
            }


            return null;
        })

    
        

        }

    }



    render(){
        return(
            <div>
                <canvas ref="canvas" width={730} height={50} />
            </div>
        )
    }
}



export default ActivitiesGUI