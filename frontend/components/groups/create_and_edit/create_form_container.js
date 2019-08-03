import { createGroup } from "../../../actions/group_actions";
import { connect } from 'react-redux'
import GroupForm from './group_form'


const msp = (state) => {
    return {
        group: {
            name: "",
            description: "",
            locationId: 1,
            private: false
        }
    }
}

const mdp = (dispatch) => {
    return {
        action: (group) => dispatch(createGroup(group))
    }
}

export default connect(msp, mdp)(GroupForm)