import { Divider, List, ListItem } from '@mui/material';
import { FC } from 'react';
import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';
import { PlansFeedItem } from './PlansFeedItem';

export interface PlansFeedProps {
    planItemList: IPlan[],
    localUser: IUser,
};

export const PlansFeed: FC<PlansFeedProps> =  ({ planItemList, localUser }) => {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    }}>
        { planItemList.map(p => (
                <PlansFeedItem key={p.plan_id} localUser={localUser} planItem={p} />
            )) }
    </div>
    );
};