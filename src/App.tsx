import React, { Fragment, FunctionComponent, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { classNames, NavigationDrawer, Tooltip, TooltipSetRef, useLocalStorage, useMobile } from 'reactjs-library'
import './App.sass'
import ApplicationBar from './components/ApplicationBar/ApplicationBar'
import Icon from './components/Icon/Icon'
import List from './components/List/List'
import EducationSection from './core/Education/EducationSection'
import ExperienceSection from './core/Experience/ExperienceSection'
import ProfileSection from './core/Profile/ProfileSection'
import ProjectsSection from './core/Projects/ProjectsSection'
import SkillsSection from './core/Skills/SkillsSection'
import useTitle from './hooks/useTitle'

const App: FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path={[ '/', '/:section' ]}>
                    <InnerApp/>
                </Route>
            </Switch>
        </Router>
    )
}

const InnerApp: FunctionComponent = () => {
    let [ isMenuOpen, setMenuOpen ] = useLocalStorage<boolean>('IsMenuOpen', false)
    let [ width ] = useLocalStorage<number>('NavigationDrawer-Width', 8 * 30)
    let [ isMobile ] = useMobile()
    let [ title ] = useTitle('Ítalo Andrade')

    let menus = [
        { title: 'Profile', icon: 'account-circle', component: <ProfileSection/> },
        { title: 'Experience', icon: 'briefcase', component: <ExperienceSection/> },
        { title: 'Education', icon: 'school', component: <EducationSection/> },
        { title: 'Skills', icon: 'lightbulb', component: <SkillsSection/> },
        { title: 'Projects', icon: 'code-tags', component: <ProjectsSection/> }
    ]

    let match = useRouteMatch<{ section: string }>('/:section')
    let params = match && match.params
    let section = params && params.section

    useEffect(() => {
        let element: HTMLDivElement | null = document.querySelector('#' + section)
        if (element) {
            element.focus()
        }
    }, [ section ])

    return (
        <div
            className={classNames(
                'App',
                isMenuOpen && 'NavigationDrawer-open',
                'ApplicationBar-Parent'
            )}
            style={{ marginLeft: !isMobile && isMenuOpen ? width : null }}
        >
            <ApplicationBar
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
            >
                <ApplicationBar.Title className='title'>
                    <Link to='/'>
                        {title}
                    </Link>
                </ApplicationBar.Title>
                <div style={{ width: 8 * 7 }}/>
            </ApplicationBar>
            <NavigationDrawer
                isOpen={isMenuOpen}
                setOpen={setMenuOpen}
            >
                <List>
                    {menus.map(menu => (
                        <Tooltip
                            key={menu.title}
                            title={menu.title}
                            origin={!isMobile && width <= 56 * 2 ? 'left' : undefined}
                            render={(setRef: TooltipSetRef) =>
                                <List.Item
                                    setRef={setRef}
                                    icon={<Icon name={menu.icon}/>}
                                    className={'menu' + (params && params.section === menu.title.toLowerCase() ? ' active' : '')}
                                    to={'/' + menu.title.toLowerCase()}
                                    tabIndex={!isMenuOpen ? -1 : undefined}
                                    onClick={isMobile ? setMenuOpen.bind(null, false) : undefined}
                                >
                                    {menu.title}
                                </List.Item>
                            }
                        />
                    ))}
                </List>
            </NavigationDrawer>

            {menus.map(menu => (
                <Fragment key={menu.title}>
                    {menu.component}
                </Fragment>
            ))}
        </div>
    )
}

export default App
