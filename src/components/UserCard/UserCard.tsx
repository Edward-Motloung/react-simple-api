import { useState } from 'react';
import { IUser } from '../../interfaces/IUser'
import './UserCard.modules.css';

export function UserCard(props: any) {
    const user: IUser = props.user;
    const [blocked, setBlocked] = useState({
        status: false,
        label: 'Block'
    })
    const [following, setFollowing] = useState({
        status: false,
        label: 'Follow'
    })
    const [expanded, setExpanded] = useState(false);

    const expandCard = () => {
        let expand = expanded ? false : true;
        setExpanded(expand)
    }

    const blockUser = () => {
        setBlocked({
            status: true,
            label: 'Block'
        })
    }
    
    const followUser = () => {
        if (following.status) {
            setFollowing({
                status: false,
                label: 'Follow'
            })
        } else {
            setFollowing({
                status: true,
                label: 'Unfollow'
            })
        }
    }

    return (
        <>  
            <div className={`card mb-3 ${blocked.status ? 'card--disabled': ''}`} onClick={e => expandCard()}>
                <div className="card-body d-flex flex-row" role="presentation">
                    <div className="">
                        <img src={user.profile_image} className="rounded" alt="..."/>
                    </div>
                    <div className="content mx-3 flex-column">
                        <h5 className="card-title">{user.display_name}</h5>
                        <p className="card-text">Reputation: {user.reputation}</p>
                        {following.status ? <span className="badge bg-success">Following</span> : ''}
                    </div>
                </div>
                {
                expanded 
                    ?   <div className="card-extension d-flex justify-content-around flex-row">
                            <span className="d-flex card-extension__button" onClick={e => followUser()}>
                                <span className='pl-3'>
                                    {following.label}
                                </span>
                            </span>
                            <span className="d-flex card-extension__button" onClick={e => blockUser()}>{blocked.label}</span>
                        </div>
                    : ''
                }
            </div>
        </>
    )
}