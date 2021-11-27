import React from 'react'
import ProfileEdit from '../components/profile/ProfileEdit'
import ProfileView from '../components/profile/ProfileView'
import { connect } from 'react-redux';

function Profile({user, match}) {
    return (
        <div className="body-container w-full py-8 lg:py-20">
            { user?.userInfo.uid === match.params.uid ?
                <ProfileEdit />
                :
                <ProfileView />
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Profile)
