import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { FiCalendar } from 'react-icons/fi'
import useTitle from '../../hooks/useTitle'
import useCustomCountdowns from '../../hooks/useCustomCountdowns'
import { formatShortDate } from '../../utils/time'

//import css
import "./CustomCountdownPage.css"

//import components
import PageHeader from '../../components/PageHeader/PageHeader'
import CountdownForm from '../../components/CountdownForm/CountdownForm'
import CountdownPanel from '../../components/CountdownPanel/CountdownPanel'
import CountdownCard from '../../components/CountdownCard/CountdownCard'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import CountdownProgress from '../../components/CountdownProgress/CountdownProgress'

const CustomCountdownPage = () => {
    useTitle('Custom countdown');
    const { countdowns, addCountdown, removeCountdown } = useCustomCountdowns();
    const [selectedId, setSelectedId] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);

    // Show the chosen countdown, or the newest one
    const selected = countdowns.find(countdown => countdown.id === selectedId) ?? countdowns[0];

    const handleAdd = (data) => setSelectedId(addCountdown(data).id);

    const closeModal = useCallback(() => setPendingDelete(null), []);

    const confirmDelete = () => {
        removeCountdown(pendingDelete.id);
        toast(`"${pendingDelete.title}" deleted`, { icon: '🗑️' });
        closeModal();
    };

    const handleSelect = (id) => {
        setSelectedId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='container page'>
            <PageHeader
                eyebrow="Custom countdown"
                title={<>Count down to <span className='gradient-text'>anything</span></>}
                text="Birthday, vacation, exam or wedding. Give it a name, pick a date and watch the days, hours, minutes and seconds tick away."
            />

            <div className='custom-layout'>
                <CountdownForm onAdd={handleAdd} />

                {selected ? (
                    <CountdownPanel key={selected.id} title={selected.title} date={selected.date} finishedText={`${selected.title} is here!`}>
                        <div className='panel'>
                            <CountdownProgress
                                start={selected.createdAt}
                                end={selected.date}
                                label={`Started ${formatShortDate(selected.createdAt)}`}
                                showDays
                            />
                        </div>
                    </CountdownPanel>
                ) : (
                    <StatusMessage
                        icon={FiCalendar}
                        title="No countdowns yet"
                        text="Fill in the form to start your first countdown. It will be saved in this browser."
                    />
                )}
            </div>

            {countdowns.length > 0 && (
                <section className='section'>
                    <h2 className='section-title'>Saved countdowns <span>({countdowns.length})</span></h2>
                    <div className='card-grid'>
                        {countdowns.map(countdown => (
                            <CountdownCard
                                key={countdown.id}
                                title={countdown.title}
                                date={countdown.date}
                                isActive={countdown.id === selected.id}
                                onSelect={() => handleSelect(countdown.id)}
                                onDelete={() => setPendingDelete(countdown)}
                            />
                        ))}
                    </div>
                </section>
            )}

            <ConfirmModal
                isOpen={pendingDelete !== null}
                title={`Delete "${pendingDelete?.title}"?`}
                text="This countdown will be removed from this browser. This can't be undone."
                onConfirm={confirmDelete}
                onCancel={closeModal}
            />
        </div>
    )
}

export default CustomCountdownPage
