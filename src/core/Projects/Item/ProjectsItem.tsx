import React, { FunctionComponent } from 'react'
import { classNames, dateFormat, Icon, Text, useMobile, useTimeAgo } from 'reactjs-library'
import './ProjectsItem.sass'

interface Props {
    name: string
    title: string
    period: {
        start: Date
        end: Date | string
    }
    location: string
    description: string
}

const ProjectsItem: FunctionComponent<Props> = ({
                                                    name,
                                                    title,
                                                    period,
                                                    location,
                                                    description
                                                }) => {
    let [ isMobile ] = useMobile()
    let dateFormatOptions = { month: 'short', year: 'numeric' }

    let [ timeAgo ] = useTimeAgo(new Date(period.start), {
        isMinified: true,
        now: period.end !== 'present' ? period.end as Date : null
    })

    return (
        <Text paragraph className={classNames('ProjectsItem', isMobile && 'is-mobile')}>
            <div className='company'>
                <Icon name={name}/>
            </div>
            <div>
                <div className='title'>{title}</div>
                <div className='period'>
                    {dateFormat(period.start, dateFormatOptions)}
                    &nbsp;-&nbsp;
                    {period.end === 'present'
                        ? 'Present'
                        : dateFormat(period.end, dateFormatOptions)
                    }
                    &nbsp;({timeAgo})
                </div>
                <div className='location'>{location}</div>
                <Text justify>
                    {description}
                </Text>
            </div>
        </Text>
    )
}

export default ProjectsItem
