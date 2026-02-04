import React from "react";
// MUI
import Typography from '@mui/material/Typography';

type BlogpostProps = {
    title: string;
    body: string;
}

// TODO rewrite Blog.tsx to accomodate these Blogpost.tsx, mby separate folder or Gatsby
const Blogpost: React.FC<BlogpostProps> = ({ title, body }) => {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                How Bitcoin Lightning Revolutionizes Transaction Times {title}
            </Typography >
            <div>Jan 8, 2024 // Socials</div>
            <div>- blogpost-image -</div>
            <div>
                <p>Rhoncus at nec malesuada non elementum sed. Arcu at elementum arcu leo dictum quisque. Nullam lobortis ipsum sem felis dolor tellus tellus sagittis. Feugiat ipsum viverra vitae hendrerit mi nec bibendum suscipit enim. Hendrerit faucibus donec tortor venenatis. Mauris dignissim dui tempus arcu. Venenatis risus non venenatis pellentesque sollicitudin aenean. Ac pretium sit tempus enim enim elementum. Donec congue pretium morbi nibh. Amet quis molestie pretium dignissim. </p>
                <p>
                    Et non dignissim tortor quis eget ipsum ultrices. Tortor sed ac massa dui tempus nisl id. Senectus nec mauris congue odio quam volutpat pellentesque. Aliquam purus commodo faucibus egestas ultricies cras. Varius nullam quis in ullamcorper purus tempor fames eu.
                    {body}
                </p>
            </div>
            <div>- blogpost-body-2 -</div>
            <div>Share / Socials</div>
        </React.Fragment >
    )
}

export default Blogpost;