
const defaultData =[];
const resolvers = {
	Query: {
		allApplications: () => {
			return defaultData;
		}
		
	},
	Mutation:{
		addApplication:(root, args)=>{
			console.log(args);
			defaultData.push(args);
		}
	}
};

export default resolvers;
