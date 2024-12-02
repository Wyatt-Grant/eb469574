import React, { Fragment } from 'react';
import CallWidget from './CallWidget.jsx';
import TitleDivider from './TitleDivider.jsx';
import { useData } from './DataContext.jsx';

const ActivityList = () => {
    const { activities, loading, error, tab, archiveAll, unarchiveAll } = useData();

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <div
                    className="inline-block h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >
                        Loading...
                    </span>
                </div>
            </div>

        );
    }

    if (error) {
        console.log(error);
    }

    return (
        <Fragment>
            {Object.entries(activities).map(([day, activities]) => (
                <div key={day}>
                    <TitleDivider title={day} />
                    {activities.map(activity => (
                        <CallWidget key={activity.id} activity={activity} />
                    ))}
                </div>
            ))}

            <div className="flex justify-between">
                <button onClick={() => tab == 0 ? archiveAll() : unarchiveAll()} className="rounded-md bg-red-600 p-2 w-full mt-3 hover:bg-red-700 text-white active:scale-95 focus:outline-none">{tab == 0 ? "Archive" : "Unarchive"} All</button>
            </div>
        </Fragment>
    );
};

export default ActivityList;
