import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setT] = useState(0);

    const setTab = (t) => {
        setLoading(true);
        setT(t);
    }

    const updateActivityArchivedStatus = async (id, status, skipUpdate = false) => {
        const url = `https://aircall-api.onrender.com/activities/${id}`;
        const data = {
          is_archived: status,
        };
      
        try {
          const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            if (!skipUpdate) {
            const newActivities = Object.entries(activities).reduce((acc, [day, activitiesArray]) => {
                // Filter the activities for the current day
                const filteredActivities = activitiesArray.filter(activity => activity.id !== id);
              
                // Only add the day to the new object if there are activities left
                if (filteredActivities.length > 0) {
                  acc[day] = filteredActivities;
                }
              
                return acc;
              }, {});
              setActivities(newActivities);
            }
          } else {
            console.log('Error updating activity:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const archiveAll = () => {
        Object.entries(activities).forEach(([day, activities]) => {
            activities.forEach(activity => {
                updateActivityArchivedStatus(activity.id, true, true);
            })
        });
        setActivities({});
    };

    const unarchiveAll = () => {
        Object.entries(activities).forEach(([day, activities]) => {
            activities.forEach(activity => {
                updateActivityArchivedStatus(activity.id, false, true);
            })
        });
        setActivities({});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://aircall-api.onrender.com/activities');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                const groupedData = data.reduce((acc, item) => {
                    const date = new Date(item.created_at);
                    const day = date.toISOString().split('T')[0];

                    if (tab == 0 && !item.is_archived || tab == 1 && item.is_archived) {
                        if (!acc[day]) {
                            acc[day] = [];
                        }
                        acc[day].push(item);
                    }

                    return acc;
                }, {});

                setActivities(groupedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tab]);

    return (
        <DataContext.Provider value={{ activities, loading, error, tab, setTab, updateActivityArchivedStatus, archiveAll, unarchiveAll }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
