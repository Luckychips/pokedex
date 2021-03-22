<script>
  import { onMount } from 'svelte';
  import ApexCharts from 'apexcharts';
  import Icon from 'svelte-awesome';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import PopUp from '../../components/PopUp.svelte';

  export let pokemon;

  let isHidePopUp = true;
  let isLoading = true;
  let isLoadingSkillBox = true;
  let skills = null;

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1000);

    createBaseStatChart();
    createLevelMoves();
  });

  function createBaseStatChart() {
    if (pokemon.stats) {
      const seriesValue = [];
      const seriesPercentage = [];
      const labels = [];
      if (Array.isArray(pokemon.stats)) {
        pokemon.stats.map((item) => {
          seriesValue.push(item.base_stat);
          seriesPercentage.push((item.base_stat / 255) * 100);
          labels.push(item.stat.name);
        });
      }

      const options = {
        series: seriesPercentage,
        chart: {
          width: 600,
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ['#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'],
        labels: labels,
        legend: {
          show: true,
          floating: true,
          fontSize: '14px',
          position: 'left',
          offsetX: 30,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return `${seriesName}: ${seriesValue[opts.seriesIndex]}`;
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      };

      const chart = new ApexCharts(document.querySelector('#base-stat-chart'), options);
      chart.render();
    }
  }

  function createLevelMoves() {
    if (pokemon.moves) {
      const filtered = [];
      for (let i = 0; i < pokemon.moves.length; i++) {
        for (let j = 0; j < pokemon.moves[i].version_group_details.length; j++) {
          const versionDetailInfo = pokemon.moves[i].version_group_details[j];
          const versionGroup = versionDetailInfo.version_group;
          const moveLearnMethod = versionDetailInfo.move_learn_method;
          if (versionGroup.name === 'black-white' && ['level-up'].includes(moveLearnMethod.name)) {
            filtered.push({
              skill: pokemon.moves[i].move,
              info: versionDetailInfo,
            });

            break;
          }
        }
      }

      const sorted = filtered.sort((a, b) => {
        if (a.info.level_learned_at >= b.info.level_learned_at) {
          return 1;
        }

        if (a.info.level_learned_at < b.info.level_learned_at) {
          return -1;
        }
      });

      isLoadingSkillBox = false;
      skills = sorted;
      console.log(skills);
    }
  }

  async function getAbilityContent(url) {
    isHidePopUp = !isHidePopUp;
    try {
      const response = await fetch(url);
      // pokemon = await response.json();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async function getSkillContent(url) {
    isHidePopUp = !isHidePopUp;
    try {
      const response = await fetch(url);
      // pokemon = await response.json();
      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  }
</script>

<section class="">
  {#if !isHidePopUp}
    <PopUp />
  {/if}
  <div class="pokemon-profile-header">
    <div class="thumbnail-downloading border-double border-4 border-green-600 rounded-xl">
      {#if isLoading}
        <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
      {:else}
        <img src={pokemon.sprites.front_default} alt="thumbnail" />
      {/if}
    </div>
    <div class="pokemon-name">{pokemon.name}</div>
  </div>
  <div class="pokemon-types">
    {#each pokemon.types as value}
      <span
        class="type-tag"
        class:grass={value.type.name === 'grass'}
        class:poison={value.type.name === 'poison'}
        class:fire={value.type.name === 'fire'}
        class:flying={value.type.name === 'flying'}
        class:water={value.type.name === 'water'}
        class:bug={value.type.name === 'bug'}
        class:normal={value.type.name === 'normal'}
        class:ground={value.type.name === 'ground'}
        class:electric={value.type.name === 'electric'}
        class:psychic={value.type.name === 'psychic'}
        class:ice={value.type.name === 'ice'}
        class:ghost={value.type.name === 'ghost'}
        class:steel={value.type.name === 'steel'}
        class:rock={value.type.name === 'rock'}
        class:fighting={value.type.name === 'fighting'}
        class:dragon={value.type.name === 'dragon'}
        class:dark={value.type.name === 'dark'}
        class:fairy={value.type.name === 'fairy'}>{value.type.name}</span
      >
    {/each}
  </div>
  <div id="base-stat-chart" />
  <div class="pokemon-abilities">
    <div class="title">Ability</div>
    {#each pokemon.abilities as value}
      <div
        class={`ability-name ${value.is_hidden ? 'text-blue-300' : 'text-blue-900'}`}
        on:click={(e) => getAbilityContent(value.ability.url)}
      >
        {value.ability.name}
      </div>
    {/each}
  </div>
  <div class="pokemon-skills">
    <div class="title">Skill</div>
    {#if isLoadingSkillBox}
      <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
    {:else}
      <table class="skill-table-set table-auto">
        <thead>
          <tr>
            <th class="w-1/4">-</th>
            <th class="w-3/4">-</th>
          </tr>
        </thead>
        <tbody>
          {#each skills as value}
            <tr class="skill-name" on:click={(e) => getSkillContent(value.skill.url)}>
              <td>{value.info.level_learned_at}</td>
              <td>{value.skill.name}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</section>

<style type="text/scss">
  section {
    margin-left: 100px;

    .title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 15px;
    }

    .pokemon-profile-header {
      display: flex;
      align-items: center;

      .thumbnail-downloading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        margin: 15px;
      }

      img {
        width: 120px;
      }

      .pokemon-name {
        font-size: 1.1rem;
        font-weight: bold;
      }
    }

    .pokemon-types {
      .type-tag {
        color: white;
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 8px;
        margin-right: 10px;

        &.grass {
          background-color: #78c850;
        }
        &.poison {
          background-color: #a040a0;
        }
        &.fire {
          background-color: #f08030;
        }
        &.flying {
          background-color: #a890f0;
        }
        &.water {
          background-color: #6890f0;
        }
        &.bug {
          background-color: #a8b820;
        }
        &.normal {
          background-color: #a8a878;
        }
        &.fairy {
          background-color: #ee99ac;
        }
        &.ground {
          background-color: #e0c068;
        }
        &.electric {
          background-color: #f8d030;
        }
        &.psychic {
          background-color: #f85888;
        }
        &.ice {
          background-color: #98d8d8;
        }
        &.ghost {
          background-color: #705898;
        }
        &.steel {
          background-color: #b8b8d0;
        }
        &.rock {
          background-color: #b8a038;
        }
        &.fighting {
          background-color: #c03028;
        }
        &.dragon {
          background-color: #7038f8;
        }
        &.dark {
          background-color: #705848;
        }
      }
    }
  }

  #base-stat-chart {
    position: absolute;
    top: 0;
    left: 300px;
  }

  .pokemon-abilities {
    .title {
      margin-top: 50px;
    }

    .ability-name {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .pokemon-skills {
    width: 300px;

    .title {
      margin-top: 50px;
    }

    .skill-table-set {
      width: 100%;
      border: 1px solid;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 50px;

      td {
        border: 1px solid;
      }
    }

    .skill-name {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
