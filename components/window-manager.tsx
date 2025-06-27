"use client"

import { useWindows } from "./window-context"
import Window from "./window"
import AboutMe from "./apps/about-me"
import ProjectExplorer from "./apps/project-explorer"
import SkillsPanel from "./apps/skills-panel"
import Resume from "./apps/resume"
import ContactForm from "./apps/contact-form"
import Terminal from "./apps/terminal"
import PhotoGallery from "./apps/photo-gallery"
import MusicPlayer from "./apps/music-player"
import GamesFolder from "./apps/games-folder"
import RecycleBin from "./apps/recycle-bin"
import Minesweeper from "./minesweeper"
import Solitaire from "./apps/solitaire"
import Snake from "./apps/snake"
import Calculator from "./apps/calculator"
import Paint from "./apps/paint"
import Achievements from "./apps/achievements"
import WebBrowser from "./apps/web-browser"
import ProjectDetails from "./apps/project-details"
import DesktopProperties from "./apps/desktop-properties"
import VolumeControl from "./apps/volume-control"
import NetworkSettings from "./apps/network-settings"
import SystemInfo from "./apps/system-info"
import Notepad from "./notepad"
import FileExplorer from "./file-explorer"
import ControlPanel from "./apps/control-panel"
import WordPad from "./apps/wordpad"
import RunDialog from "./apps/run-dialog"
import ShutdownDialog from "./apps/shutdown-dialog"

export default function WindowManager() {
  const { windows } = useWindows()

  const renderWindowContent = (window: any) => {
    switch (window.component) {
      case "AboutMe":
        return <AboutMe />
      case "ProjectExplorer":
        return <ProjectExplorer />
      case "SkillsPanel":
        return <SkillsPanel />
      case "Resume":
        return <Resume />
      case "ContactForm":
        return <ContactForm />
      case "Terminal":
        return <Terminal />
      case "PhotoGallery":
        return <PhotoGallery />
      case "MusicPlayer":
        return <MusicPlayer />
      case "GamesFolder":
        return <GamesFolder />
      case "RecycleBin":
        return <RecycleBin />
      case "Minesweeper":
        return <Minesweeper />
      case "Solitaire":
        return <Solitaire />
      case "Snake":
        return <Snake />
      case "Calculator":
        return <Calculator />
      case "Paint":
        return <Paint />
      case "Achievements":
        return <Achievements />
      case "WebBrowser":
        return <WebBrowser data={window.data} />
      case "ProjectDetails":
        return <ProjectDetails data={window.data} />
      case "DesktopProperties":
        return <DesktopProperties onWallpaperChange={window.data?.onWallpaperChange} />
      case "VolumeControl":
        return <VolumeControl />
      case "NetworkSettings":
        return <NetworkSettings />
      case "SystemInfo":
        return <SystemInfo />
      case "Notepad":
        return <Notepad />
      case "FileExplorer":
        return <FileExplorer data={window.data} />
      case "ControlPanel":
        return <ControlPanel />
      case "WordPad":
        return <WordPad />
      case "RunDialog":
        return <RunDialog />
      case "ShutdownDialog":
        return <ShutdownDialog />
      default:
        return <div className="p-4">Unknown application: {window.component}</div>
    }
  }

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {renderWindowContent(window)}
        </Window>
      ))}
    </>
  )
}
