import React, { useEffect } from "react";
import styles from './Profile.module.css';
import PropTypes from 'prop-types';

const Profile = ({ userId, cachedForUser, profilePlans, onNeedLoadOwnPlans, onNeedLoadLikedPlans, onNeedLoadDislikedPlans }) => {
    useEffect(() => {
        if (cachedForUser !== userId && !profilePlans.own.isFetched && !profilePlans.own.isLoading) onNeedLoadOwnPlans();
        if (cachedForUser !== userId && !profilePlans.liked.isFetched && !profilePlans.liked.isLoading) onNeedLoadLikedPlans();
        if (cachedForUser !== userId && !profilePlans.disliked.isFetched && !profilePlans.disliked.isLoading) onNeedLoadDislikedPlans();
    }, []);

    console.log('profilePlans', profilePlans)

    return (
        <section>
            <div>profile {userId}</div>
            <div style={{ display: 'flex' }} >
                <div style={{ width: '300px' }} >
                    <div>Mine</div>
                    {
                        profilePlans.own.isLoading ?
                        'LOADING OWN PLANS' :
                        profilePlans.own.content.length ?
                        profilePlans.own.content.map((e) => <div key={e.id}>{e.id}</div>) :
                        'NO OWN DATA'
                    }
                </div>
                <div style={{ width: '300px' }} >
                    <div>Like</div>
                    {
                        profilePlans.liked.isLoading ?
                        'LOADING LIKED PLANS' :
                        profilePlans.liked.content.length ?
                        profilePlans.liked.content.map((e) => <div key={e.id}>{e.id}</div>) :
                        'NO LIKED DATA'
                    }
                </div>
                <div style={{ width: '300px' }} >
                    <div>Dislike</div>
                    {
                        profilePlans.disliked.isLoading ?
                        'LOADING DISLIKED PLANS' :
                        profilePlans.disliked.content.length ?
                        profilePlans.disliked.content.map((e) => <div key={e.id}>{e.id}</div>) :
                        'NO DISLIKED DATA'
                    }
                </div>
            </div>
        </section>
    );
}

Profile.propTypes = {
    userId: PropTypes.string,
    profilePlans: PropTypes.object,
    onNeedLoadOwnPlans: PropTypes.func,
    onNeedLoadLikedPlans: PropTypes.func,
    onNeedLoadDislikedPlans: PropTypes.func 
}

export default Profile;
