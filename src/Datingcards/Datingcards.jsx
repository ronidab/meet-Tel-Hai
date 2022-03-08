import axios from "axios";
import React, { useState } from "react";
import DatingCard from 'react-tinder-card'

class Datingcards extends React.Component {

    state = {
        people: [
            { name: "Random Guy", imgUrl: "https://www.google.com/search?q=someone&tbm=isch&ved=2ahUKEwj48_qCu7H2AhUQNuwKHfrTAFQQ2-cCegQIABAA&oq=someone&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEO8DECc6CAgAEIAEELEDOgsIABCABBCxAxCDAVDCEVjbLWCJL2gAcAB4AIABqAGIAYgJkgEDMC44mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=oqUkYviaDpDssAf6p4OgBQ&bih=625&biw=1366&rlz=1C1GCEA_enIL937IL937#imgrc=XQqtUcWmINkUJM" },
            { name: "Another Guy", imgUrl: "https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg" },
            { name: "Random Girl", imgUrl: "https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg" },
            { name: "Another Girl", imgUrl: "https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg" }
        ]
    };
    componentDidMount(){
        // bring first batch of swipes
    }
    swiped = async (direction, nameToDelete) => {
        console.log("recieving " + nameToDelete)
        const [removed,...people] = this.state.people;
        const { data } = await axios.get("/more-matches")
        this.setState({people:[...people,...data.people]})
    }

    outOfFrame = (name) => {
        console.log("----before return at dating cards----")
        console.log(name + " left the screen")
    }

    render(){
        const {people} = this.state;
        
        return(
            <div className = "datingCards" >
                <div className="datingCards_container">
                    {(people.length > 0) && (
                        <DatingCard
                            className="swipe"
                            key={people[0].name}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => this.swiped(dir, people[0].name)}
                            onCardLeftScreen={() => this.outOfFrame(people[0].name)} >
                            <img src={people[0].imgUrl}/>
                            {people[0].name}
                        </DatingCard>

                    )}
                </div>
            </div>
        )
    }
}

export default Datingcards