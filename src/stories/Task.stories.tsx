import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action("removeTask"),
        changeTaskStatus: action("changeTaskStatus"),
        updateTask: action("updateTask"),
        task: {id: "www", title: "JS", isDone: true}
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {

    },
};
export const TaskIsNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: "www", title: "CSS", isDone: false}
    },
};




