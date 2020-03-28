import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from "@apollo/react-hooks";

import { Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";
import * as GetCartItemsTypes from "./__generated__/GetCartItems";
import gql from 'graphql-tag';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`

interface CartProps extends RouteComponentProps {

}

const Cart: React.FC<CartProps> = () => {
  const {data, loading, error} = useQuery<GetCartItemsTypes.GetCartItems>(GET_CART_ITEMS);

  if(loading) return <Loading />
  if(error) return <p>Error: {error.message}</p>
    
  return (
		<>
			<Header>My Cart</Header>
			{data?.cartItems?.map(launchId => (
				<CartItem key={launchId} launchId={launchId} />
			))}
			{!data?.cartItems?.length && (
				<p data-testid="empty-message">No items in your cart</p>
			)}
		</>
	);
}

export default Cart;
