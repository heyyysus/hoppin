import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { PlansFeedItem } from '../components/PlansFeedItem';
import { IPlan } from '../api/models/IPlan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/PlansFeedItem',
  component: PlansFeedItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlansFeedItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlansFeedItem> = (args) => <ThemeProvider theme={theme}><PlansFeedItem {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const planItem: IPlan = {
    plan_id: 0,
    plan_name: "Lets Hoop",
    plan_desc: "yo lets fucking hoop tmr yea?",
    author: {
        user_id: '1',
        username: 'TroyDaBoy',
        bio: "BIO",
    },
    ts: (new Date("2023-03-15T12:30")),
    plan_lat: 34.41066863500888, 
    plan_lng: -119.86227737611178,
    start_ts: new Date(),
    end_ts: new Date(),
};

Item1.args = {
    planItem: planItem
};
