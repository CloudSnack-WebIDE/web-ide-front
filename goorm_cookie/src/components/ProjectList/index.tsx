import React from 'react';
import './ProjectList.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


interface Project {
    id: string;
    name: string;
}

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const style = {
        textDecoration: "none",
        color: '#f0f0f0',
        display: 'flex',
        borderTop: '1px solid #f0f0f0',
        minHeight: '40px'
    }
    return (
        <StyledProjectList className="project-list">
            {projects.map((project, key) => (
                <Link to={`/room/${project.id}/python`}
                    key={key}
                    style={style}>
                    <StyledCircle/>
                    <StyledProjectEntry key={project.id} className="project-entry">
                        {project.name}
                    </StyledProjectEntry>
                </Link>
            ))}
        </StyledProjectList>
    );
};

const StyledProjectList = styled.div`
    height : 100%;
    width : 900px;
`

const StyledProjectEntry= styled.div`
    margin-top: auto;
    margin-bottom: auto;
`

const StyledCircle = styled.div`
    background-color : green;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin-top: auto;
    margin-bottom: auto;
`

export default ProjectList;
