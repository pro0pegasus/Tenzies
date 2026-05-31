

function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <button style={styles}
        onClick={props.hold}
        >{props.value}</button>
    )
}

export default Die