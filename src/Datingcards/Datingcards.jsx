import React from "react";

const Datingcards = () => {

    const [people, setPeople] = useState([

        {name: "Random Guy", imgUrl:"https://www.google.com/search?q=someone&tbm=isch&ved=2ahUKEwj48_qCu7H2AhUQNuwKHfrTAFQQ2-cCegQIABAA&oq=someone&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEO8DECc6CAgAEIAEELEDOgsIABCABBCxAxCDAVDCEVjbLWCJL2gAcAB4AIABqAGIAYgJkgEDMC44mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=oqUkYviaDpDssAf6p4OgBQ&bih=625&biw=1366&rlz=1C1GCEA_enIL937IL937#imgrc=XQqtUcWmINkUJM"},
        {name: "Another Guy", imgUrl:"https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg"},
        {name: "Random Girl", imgUrl:"https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg"},
        {name: "Another Girl", imgUrl:"https://i.ytimg.com/vi/CDDf7gOFMtI/maxresdefault.jpg"}
    ])
    const swiped = (direction, nameToDelete) => {
        console.log("recieving " + nameToDelete)
    }
    const outOfFrame = (name) => {
        console.log(name + " left the screen")
    }
    console.log("before return at dating cards")
    return (
        <div className="datingCards">
            <div className="datingCards_container">
            {people.map((person) => (
                <DatingCard
                className="swipe"
                key={person.name}
                preventSwipe = {['up','down']}
                onSwipe={(dir)=>swiped(dir, person.name)}
                onCardLeftScreen={()=>outOfFrame(person.name)} >
                    <div style={{backgroundImage: 'url(${person.imgUrl})'}} className="card">
                        <h3>{person.name}</h3>
                    </div>
                </DatingCard>
            ))} 
            </div>
        </div>
    )
}

export default Datingcards