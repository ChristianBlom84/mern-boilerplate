import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubscriberList from '../partials/SubscriberList';
import SubscriberModal from '../partials/SubscriberModal';
import Spinner from '../partials/Spinner';
import styles from './Subscribers.module.scss';

export interface Subscriber {
  _id?: string;
  name: string;
  email: string;
  notifications?: Notification[];
  organization?: string;
  pushToken: string;
}

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>();
  const [editing, setEditing] = useState(false);
  const [editInfo, setEditInfo] = useState<Subscriber>();

  const fetchSubscribers = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/subscribers/all`
      );
      setSubscribers(res.data.subscribers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return subscribers ? (
    <main className={styles.main}>
      {editing ? (
        <SubscriberModal
          editInfo={editInfo}
          setEditing={setEditing}
          setEditInfo={setEditInfo}
          subscribers={subscribers}
          setSubscribers={setSubscribers}
        />
      ) : null}
      <div className={styles.userList}>
        <h2>Making Waves</h2>
        <h3>Subscribers:</h3>
        <SubscriberList
          setEditing={setEditing}
          setEditInfo={setEditInfo}
          subscribers={subscribers}
        />
      </div>
    </main>
  ) : (
    <Spinner />
  );
};

export default Subscribers;
