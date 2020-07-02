import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import styles from './SubscriberModal.module.scss';
import { Subscriber } from '../pages/Subscribers';

interface Props {
  editInfo: Subscriber | undefined;
  setEditInfo: (subscriber: Subscriber | undefined) => void;
  setEditing: (state: boolean) => void;
  subscribers: Subscriber[];
  setSubscribers: (subscribers: Subscriber[]) => void;
}

const SubscriberModal: React.FC<Props> = ({
  editInfo,
  setEditInfo,
  setEditing,
  subscribers,
  setSubscribers
}: Props) => {
  const [formData, setFormData] = useState({
    name: editInfo ? editInfo.name : '',
    email: editInfo ? editInfo.email : '',
    organization: editInfo ? editInfo.organization : '',
    pushToken: editInfo ? editInfo.pushToken : ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBackgroundVisible(true);
    }, 10);
  }, []);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setEditing(false);
    setEditInfo(undefined);
  };

  const updateSubscriber = async (e: React.FormEvent): Promise<void> => {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/subscribers/update`,
      {
        name: formData.name,
        email: formData.email
      }
    );

    if (res.status === 200) {
      const newSubscribers = subscribers.map(subscriber => {
        if (subscriber._id === res.data._id) {
          return res.data;
        }
        return subscriber;
      });
      setSubscribers(newSubscribers);
    }

    setTimeout(() => {
      setSending(false);
      setSuccessMessage('Changes successfully saved!');
      setTimeout(() => {
        setEditing(false);
      }, 1200);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSending(true);
    await updateSubscriber(e);
  };

  const handleDelete = async (): Promise<void> => {
    setSending(true);

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/subscribers/delete/${
          editInfo ? editInfo.email : ''
        }`
      );

      if (res.status === 200) {
        const newSubscribers = subscribers.filter(subscriber => {
          return subscriber._id !== res.data._id;
        });
        setSubscribers(newSubscribers);
      }

      setTimeout(() => {
        setSending(false);
        setSuccessMessage('User successfully deleted!');
        setTimeout(() => {
          setEditing(false);
        }, 1200);
      }, 400);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className={`${styles.background} ${
        backgroundVisible ? styles.fadeIn : ''
      }`}
      onClick={(e): void => handleCloseModal(e)}
    >
      <div
        className={`${styles.modal} ${
          successMessage ? styles.successMessage : ''
        } ${backgroundVisible ? styles.growIn : ''}`}
        onClick={(e): void => e.stopPropagation()}
      >
        {!successMessage ? (
          <form className={styles.form} action="post" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e): void =>
                setFormData({ ...formData, name: e.currentTarget.value })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e): void =>
                setFormData({ ...formData, email: e.currentTarget.value })
              }
            />
            <label htmlFor="organization">Organization:</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              disabled
              onChange={(e): void =>
                setFormData({ ...formData, email: e.currentTarget.value })
              }
            />
            <label htmlFor="pushToken">Push Token:</label>
            <input
              type="text"
              name="pushToken"
              value={formData.pushToken}
              disabled
              onChange={(e): void =>
                setFormData({ ...formData, email: e.currentTarget.value })
              }
            />
            {sending ? (
              <Spinner />
            ) : (
              <div className={styles.ctaButtons}>
                <button className={styles.button} type="submit">
                  Save
                </button>
                {editInfo ? (
                  <button
                    className={`${styles.delete} ${styles.button}`}
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            )}
          </form>
        ) : successMessage ? (
          <span>{successMessage}</span>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default SubscriberModal;
