const WSMap = () => {
  const map = new Map();

  const getGame = (urlid) => {
    if (!map.has(urlid)) map.set(urlid, new Map());
    return map.get(urlid);
  }
  const getUser = (urlid, uuid) => getGame(urlid).get(uuid);
  const hasUser = (urlid, uuid) => getGame(urlid).has(uuid);

  return {
    getGame,
    getUser,
    setUser: (urlid, uuid, ws) => getGame(urlid).set(uuid, ws),
    closeUser: (urlid, uuid) => hasUser(urlid, uuid) && getUser(urlid, uuid).close(),
    deleteUser: (urlid, uuid) => hasUser(urlid, uuid) && getGame(urlid).delete(uuid),
    forEachUserInGame: (urlid, callback) => getGame(urlid).forEach(callback)
  }
};
 
module.exports = WSMap;
