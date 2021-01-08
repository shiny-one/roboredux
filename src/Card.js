import React from 'react';

const Card = (props) =>{
	const { name, email, desc, id} = props;
	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
			<img alt='robot' src={`https://robohash.org/${id}?size=200x200`} />
			<div>
				<h2 className='f5'>{name}</h2>
				<p className='f6'>{email}</p>
				<p className='f6'>{desc}</p>
			</div>
		</div>
	)
}

export default Card;